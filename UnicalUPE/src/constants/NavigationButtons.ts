import Colors from "./Colors"

export const anonymousButtons = (navigation, signOut) => {
    return [
        {
            buttonText: 'Login',
            destination: 'Login',
            navigation: navigation,
            backColor: '',
        },
        {
            buttonText: 'Sobre',
            destination: 'About',
            navigation: navigation,
            backColor: Colors.Red.background,
        },
    ]
}

export const studentButtons = (navigation, signOut) => {
    return [
        // {
        //     buttonText: 'Login',
        //     destination: 'Login',
        //     navigation: navigation,
        //     backColor: '',
        // },
        {
            buttonText: 'Perfil',
            destination: 'Profile',
            navigation: navigation,
            backColor: Colors.Yellow.background,
        },
        {
            buttonText: 'Notificações',
            destination: 'Notifications',
            navigation: navigation,
            backColor: Colors.Green.background,
        },
        {
            buttonText: 'Sobre',
            destination: 'About',
            navigation: navigation,
            backColor: Colors.Red.background,
        },
        {
            buttonText: 'Sair',
            destination: signOut,
            navigation: navigation,
            backColor: Colors.Blue.background,
        },
    ]
}
export const adminButtons = (navigation, signOut) => {
    return [
        // {
        //     buttonText: 'Login',
        //     destination: 'Login',
        //     navigation: navigation,
        //     backColor: '',
        // },
        {
            buttonText: 'Perfil',
            destination: 'Profile',
            navigation: navigation,
            backColor: Colors.Yellow.background,
        },
        {
            buttonText: 'Notificações',
            destination: 'Notifications',
            navigation: navigation,
            backColor: Colors.Green.background,
        },
        {
            buttonText: 'Sobre',
            destination: 'About',
            navigation: navigation,
            backColor: Colors.Red.background,
        },
        {
            buttonText: 'Adicionar Evento',
            destination: 'AddEvent',
            navigation: navigation,
            backColor: Colors.Blue.background,
        },
        {
            buttonText: 'Sair',
            destination: signOut,
            navigation: navigation,
            backColor: Colors.Blue.background,
        },
    ]
}