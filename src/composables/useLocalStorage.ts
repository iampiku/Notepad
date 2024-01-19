export default function useLocalStorage<T>(key: string) {
	function getItem() {
		try {
			const item = localStorage.getItem(key);
			return item as T;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	function setItem(item: T) {
		try {
			localStorage.setItem(key, String(item));
		} catch (error) {
			console.error(error);
		}
	}

	function removeItem() {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			console.error(error);
		}
	}

	return {
		getItem,
		setItem,
		removeItem,
	};
}
