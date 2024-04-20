use tauri::{
    window, AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem, Window, WindowBuilder,
};

pub const TRAY_ID: &str = "hello";

pub fn create_tray(app: AppHandle) -> SystemTray {
    let hide = CustomMenuItem::new("showhide", "Hide");
    let quit = CustomMenuItem::new("quit", "Quit");
    let tray_menu = SystemTrayMenu::new()
        .add_item(hide)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);

    SystemTray::new()
        .with_id(TRAY_ID)
        .with_menu(tray_menu)
        .on_event(move |event| on_tray_event(&app, event))
}

fn on_tray_event(app: &AppHandle, event: SystemTrayEvent) {
    let main_window = app.get_window("main");

    match event {
        SystemTrayEvent::LeftClick { .. } => {
            toggle_main_window(app.clone(), main_window);
            println!("system tray received a left click");
        }
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => {
                exit(app.clone());
            }
            "showhide" => {
                toggle_main_window(app.clone(), main_window);
            }
            _ => {
                println!("system tray received a left click");
            }
        },
        _ => {}
    }
}

fn toggle_main_window(app: AppHandle, window: Option<Window>) {
    match window {
        Some(window) => {
            if !window.is_visible().unwrap() {
                window.show().ok();
                window.unminimize().ok();
                window.set_focus().ok();
                window.emit("window-shown", "").ok();
                // 修改右键的时候显示文本

                return;
            }
        }
        None => {
            let window =
                WindowBuilder::new(&app, "main", tauri::WindowUrl::App("index.html".into()))
                    .build()
                    .unwrap();

            // 修改右键的时候显示文本
            window.set_title("New Window").ok();
            window.set_focus().ok();
        }
    }
}

pub fn exit(app: AppHandle) {}
