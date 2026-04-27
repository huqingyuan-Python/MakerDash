use serde::{Deserialize, Serialize};
use serialport::{DataBits, FlowControl, Parity, SerialPort, StopBits, SerialPortType};
use std::io::{Read, Write};
use std::sync::Mutex;
use std::time::Duration;
use tauri::{AppHandle, Emitter, Manager, State};

// 串口状态管理
pub struct SerialState {
    port: Mutex<Option<Box<dyn SerialPort>>>,
}

impl Default for SerialState {
    fn default() -> Self {
        Self {
            port: Mutex::new(None),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SerialPortInfo {
    pub name: String,
    pub port_type: String,
}

#[tauri::command]
pub fn list_serial_ports() -> Result<Vec<String>, String> {
    let ports = serialport::available_ports()
        .map_err(|e| format!("Failed to list ports: {}", e))?;

    let port_names: Vec<String> = ports
        .into_iter()
        .map(|p| p.port_name)
        .collect();

    Ok(port_names)
}

#[tauri::command]
pub fn list_serial_ports_detailed() -> Result<Vec<SerialPortInfo>, String> {
    let ports = serialport::available_ports()
        .map_err(|e| format!("Failed to list ports: {}", e))?;

    let port_infos: Vec<SerialPortInfo> = ports
        .into_iter()
        .map(|p| {
            let port_type = match p.port_type {
                SerialPortType::UsbPort(_, _) => "USB".to_string(),
                SerialPortType::PciPort => "PCI".to_string(),
                SerialPortType::BluetoothPort => "Bluetooth".to_string(),
                SerialPortType::DvibPort => "DVIB".to_string(),
                SerialPortType::Unknown => "Unknown".to_string(),
            };
            SerialPortInfo {
                name: p.port_name,
                port_type,
            }
        })
        .collect();

    Ok(port_infos)
}

#[tauri::command]
pub async fn connect_serial(
    port_name: String,
    baud_rate: u32,
    state: State<'_, SerialState>,
    app_handle: AppHandle,
) -> Result<(), String> {
    let mut port = serialport::new(&port_name, baud_rate)
        .data_bits(DataBits::Eight)
        .stop_bits(StopBits::One)
        .parity(Parity::None)
        .flow_control(FlowControl::None)
        .timeout(Duration::from_millis(100))
        .open()
        .map_err(|e| format!("Failed to open port {}: {}", port_name, e))?;

    // 保存端口到状态
    {
        let mut serial_port = state.port.lock().unwrap();
        *serial_port = Some(port.try_clone().map_err(|e| e.to_string())?);
    }

    // 在新线程中读取数据
    let app_handle_clone = app_handle.clone();
    std::thread::spawn(move || {
        let mut port = port;
        let mut buf = vec![0u8; 1024];

        loop {
            match port.read(&mut buf) {
                Ok(bytes_read) => {
                    if bytes_read > 0 {
                        let data = String::from_utf8_lossy(&buf[..bytes_read]).to_string();
                        if let Err(e) = app_handle_clone.emit("serial-data", &data) {
                            eprintln!("Failed to emit data: {}", e);
                            break;
                        }
                    }
                }
                Err(e) => {
                    eprintln!("Read error: {}", e);
                    break;
                }
            }
            std::thread::sleep(Duration::from_millis(10));
        }
    });

    Ok(())
}

#[tauri::command]
pub async fn disconnect(state: State<'_, SerialState>) -> Result<(), String> {
    let mut port = state.port.lock().unwrap();
    *port = None;
    Ok(())
}

#[tauri::command]
pub async fn send_serial_command(
    command: String,
    state: State<'_, SerialState>,
) -> Result<(), String> {
    let port = state.port.lock().unwrap();
    if let Some(ref mut p) = *port {
        p.write_all(command.as_bytes())
            .map_err(|e| format!("Failed to write: {}", e))?;
        p.write_all(b"\n")
            .map_err(|e| format!("Failed to write newline: {}", e))?;
        Ok(())
    } else {
        Err("Not connected".to_string())
    }
}

// 模拟蓝牙连接 (实际需要平台特定的蓝牙实现)
#[tauri::command]
pub async fn connect_bluetooth(
    _address: String,
    _state: State<'_, SerialState>,
) -> Result<(), String> {
    // 注意: 蓝牙连接需要平台特定的实现
    // 这里返回模拟成功，实际使用时需要使用如 `bluetooth-serial-port` 或平台SDK
    Err("Bluetooth support requires platform-specific implementation".to_string())
}

// 模拟网络连接 (实际需要 TCP 实现)
#[tauri::command]
pub async fn connect_network(
    _address: String,
    _state: State<'_, SerialState>,
) -> Result<(), String> {
    // 注意: TCP 连接需要完整的 tokio 异步实现
    Err("Network support requires async TCP implementation".to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .manage(SerialState::default())
        .invoke_handler(tauri::generate_handler![
            list_serial_ports,
            list_serial_ports_detailed,
            connect_serial,
            disconnect,
            send_serial_command,
            connect_bluetooth,
            connect_network,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}