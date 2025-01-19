export function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Erro ao salvar no localStorage", error);
    }
}

export function getLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Erro ao ler do localStorage", error);
        return null;
    }
}

export function removeLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Erro ao remover do localStorage", error);
    }
}
