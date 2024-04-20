use tauri;

use crate::tray;

#[tauri::command]
pub async fn create_tray(app_handle: tauri::AppHandle) {
    if app_handle.tray_handle_by_id(tray::TRAY_ID).is_none() {
        tray::create_tray(app_handle.clone())
            .build(&app_handle)
            .ok();
    }
}
