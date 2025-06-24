import AsyncStorage from '@react-native-async-storage/async-storage';

export function useJarCache<T>(initialData: T): {
    getData: () => Promise<T>;
    storeData: (value: T) => Promise<void>;
    hasData: () => Promise<boolean>;
} {
    const storeData = async (value: T) => {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('my-key', jsonValue);
    };

    const getData = async (): Promise<T> => {
        const jsonValue = await AsyncStorage.getItem('my-key');
        return jsonValue != null ? JSON.parse(jsonValue) : initialData;
    };

    const hasData = async () => {
        return !!(await AsyncStorage.getItem('my-key'));
    };

    return { storeData, getData, hasData };
}
