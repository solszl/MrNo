use crate::APP;
use dirs::config_dir;
use serde_json::{json, Value};
use std::sync::Mutex;

use log::{info, warn};
use tauri::{Manager, Wry};
use tauri_plugin_store::{Store, StoreBuilder};

pub struct StoreWrapper(pub Mutex<Store<Wry>>);

pub fn init_config(app: &mut tauri::App) {
    info!("init config");

    let config_path = config_dir().unwrap();
    let config_path = config_path.join(app.config().tauri.bundle.identifier.clone());
    let config_path = config_path.join("config.json");
    info!("config path: {:?}", config_path);

    let mut store = StoreBuilder::new(app.handle(), config_path).build();

    match store.load() {
        Ok(_) => info!("Config Loaded."),
        Err(e) => {
            warn!("Config load error {:?}", e);
            info!("Config not found")
        }
    }

    app.manage(StoreWrapper(Mutex::new(store)));
}

pub fn is_first_run() -> bool {
    let state = APP.get().unwrap().state::<StoreWrapper>();
    let store = state.0.lock().unwrap();
    store.is_empty()
}

pub fn get(key: &str) -> Option<Value> {
    let state = APP.get().unwrap().state::<StoreWrapper>();
    let store = state.0.lock().unwrap();

    match store.get((key)) {
        Some(value) => Some(value.clone()),
        None => None,
    }
}

pub fn set<T: serde::Serialize>(key: &str, value: T) {
    let state = APP.get().unwrap().state::<StoreWrapper>();
    let mut store = state.0.lock().unwrap();

    store.insert(key.to_string(), json!(value)).unwrap();
    store.save().unwrap();
}
