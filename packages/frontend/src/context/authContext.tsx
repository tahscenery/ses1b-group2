import React from 'react';

export default React.createContext({
    accessToken: null,
    userId: null,
    login: (accessToken: string, userId: string) => { },
    logout: () => { }
});