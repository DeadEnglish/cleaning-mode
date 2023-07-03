// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{CustomMenuItem, SystemTray, SystemTrayMenu, SystemTrayMenuItem};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let system_tray = create_tray();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .system_tray(system_tray)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn create_tray() -> SystemTray {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let clean = CustomMenuItem::new("clean".to_string(), "Clean");
    let tray_menu = SystemTrayMenu::new()
        .add_item(quit)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(clean);

    return SystemTray::new().with_menu(tray_menu);
}
