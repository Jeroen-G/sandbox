import AsyncStorage from '@react-native-async-storage/async-storage';

export function useJarCache<T>(initialData: T): {
    getData: () => Promise<T>;
    storeData: (value: T) => Promise<void>;
} {
    const storeData = async (value: T) => {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('my-key', jsonValue);
    };

    const getData = async (): Promise<T> => {
        const jsonValue = await AsyncStorage.getItem('my-key');
        return jsonValue != null ? JSON.parse(jsonValue) : initialData;
    };

    return { storeData, getData };
}
