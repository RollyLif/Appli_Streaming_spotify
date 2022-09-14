const Credentials = () => {

    return {
        ClientId: import.meta.env.VITE_CLIENT_ID,
        ClientSecret: import.meta.env.VITE_CLIENT_SECRET,
    }
}

export { Credentials };