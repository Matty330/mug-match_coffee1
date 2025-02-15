const Auth = {
    login: (token) => {
      console.log('Token recieved in login:', token);
      localStorage.setItem('id_token', token);
    },

    getToken: () => {
        const token = localStorage.getItem('id_token');
        console.log('Token recieved from localStorage', token);
        return token;
    },

    isLoggedIN: () => {
        return !!localStorage.getItem('id_token');
    },

    logout: () => {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default Auth;