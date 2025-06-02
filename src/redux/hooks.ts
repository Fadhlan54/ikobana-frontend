import { useDispatch, useSelector, useStore } from "react-redux";

export const useAppDispatch = useDispatch.withTypes();
export const useAppSelector = useSelector.withTypes();
export const useAppStore = useStore.withTypes();

export type AppDispatch = typeof useAppDispatch;
export type AppSelector = typeof useAppSelector;
export type AppStore = typeof useAppStore;
