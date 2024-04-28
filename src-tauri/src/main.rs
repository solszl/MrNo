#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod config;

use std::sync::Mutex;

use log::info;
use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu};
use tauri_plugin_log::LogTarget;
use tauri_plugin_positioner::{Position, WindowExt};

use config::*;
use once_cell::sync::OnceCell;

pub struct StringWrapper(pub Mutex<String>);

pub static APP: OnceCell<tauri::AppHandle> = OnceCell::new();
fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit").accelerator("Cmd+Q");
    let system_tray_menu = SystemTrayMenu::new().add_item(quit);

    tauri::Builder::default()
        .plugin(tauri_plugin_positioner::init())
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets([LogTarget::LogDir, LogTarget::Stdout])
                .build(),
        )
        .plugin(tauri_plugin_store::Builder::default().build())
        .system_tray(SystemTray::new().with_menu(system_tray_menu))
        .on_system_tray_event(|app, event| {
            tauri_plugin_positioner::on_tray_event(app, &event);
            match event {
                SystemTrayEvent::LeftClick {
                    position: _,
                    size: _,
                    ..
                } => {
                    let window = app.get_window("translate").unwrap();
                    let _ = window.move_window(Position::TrayRight);
                    if window.is_visible().unwrap() {
                        window.hide().unwrap();
                    } else {
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                }
                SystemTrayEvent::RightClick {
                    position: _,
                    size: _,
                    ..
                } => {
                    println!("system tray received a right click");
                }

                SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                    "quit" => {
                        std::process::exit(0);
                    }
                    "hide" => {
                        let window = app.get_window("translate").unwrap();
                        window.hide().unwrap();
                    }
                    _ => {}
                },

                _ => {}
            }
        })
        .setup(|app| {
            // APP.get_or_init(|| app.handle());

            // init_config(app);

            // if is_first_run() {
            //     info!("first run app.");
            // }

            // use tauri::api::path::app_log_dir;
            // let log_path = app_log_dir(&app.config()).unwrap();
            // tauri::api::shell::open(&app.shell_scope(), log_path.to_str().unwrap(), None).unwrap();
            // println!("log path: {:?}", log_path);
            // app.manage(StringWrapper(Mutex::new("".to_string())));
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
