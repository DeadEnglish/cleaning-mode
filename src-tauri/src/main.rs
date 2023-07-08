// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{generate_context, generate_handler, Builder};

pub mod helpers;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let system_tray = helpers::system_tray::create_tray();

    Builder::default()
        .invoke_handler(generate_handler![greet])
        .system_tray(system_tray)
        .on_system_tray_event(helpers::system_tray::handle_tray_event)
        .run(generate_context!())
        .expect("error while running Cleaning mode")
}
