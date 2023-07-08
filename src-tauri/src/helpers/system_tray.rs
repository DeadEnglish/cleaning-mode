use tauri::{AppHandle, CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu};

fn create_tray_menu() -> SystemTrayMenu {
    let finish_cleaning = CustomMenuItem::new("finish".to_string(), "Finish cleaning");

    return SystemTrayMenu::new().add_item(finish_cleaning);
}

pub fn create_tray() -> SystemTray {
    return SystemTray::new().with_menu(create_tray_menu());
}

pub fn handle_tray_event(_app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "finish" => {
                std::process::exit(0);
            }
            _ => {}
        },
        _ => {}
    }
}
