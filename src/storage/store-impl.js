export const StoreImpl = (store) => ({
  getItem: async (name) => {
    console.log("getItem", { name });
    return (await store.get(name)) || null;
  },
  setItem: async (name, value) => {
    console.log("setItem", { name, value });
    await store.set(name, value);
    await store.save();
  },
  removeItem: async (name) => {
    console.log("removeItem", { name });
    await store.delete(name);
    await store.save();
  },
});
