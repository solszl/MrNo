use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

pub fn make_menu(app_name: &str) -> Menu {
    let mut menu = Menu::new();

    menu = menu.add_submenu(Submenu::new(
        app_name,
        Menu::new()
            .add_native_item(MenuItem::CloseWindow)
            .add_item(CustomMenuItem::new("quit", "Quit").accelerator("Cmd+q")),
    ));

    menu
}
