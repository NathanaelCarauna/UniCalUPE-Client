import Colors from "./Colors"

export const anonymousButtons = (navigation, signOut) => {
    return [
        {
            buttonText: 'sign-in',
            destination: 'Login',
            navigation: navigation,
            backColor: Colors.Orange.background,
        },
        {
            buttonText: 'question',
            destination: 'About',
            navigation: navigation,
            backColor: Colors.Red.background,
        },
    ]
}

export const studentButtons = (navigation, showModal) => {
    return [
        // {
        //     buttonText: 'Login',
        //     destination: 'Login',
        //     navigation: navigation,
        //     backColor: '',
        // },
        {
            buttonText: 'user',
            destination: 'Profile',
            navigation: navigation,
            backColor: Colors.Yellow.background,
        },
        {
            buttonText: 'bell',
            destination: 'Notifications',
            navigation: navigation,
            backColor: Colors.Green.background,
        },
        {
            buttonText: 'question',
            destination: 'About',
            navigation: navigation,
            backColor: Colors.Red.background,
        },
        {
            buttonText: 'sign-out',
            destination: showModal,
            navigation: navigation,
            backColor: Colors.Pourple.background,
        },
    ]
}
export const adminButtons = (navigation, showModal) => {
    return [
        // {
        //     buttonText: 'Login',
        //     destination: 'Login',
        //     navigation: navigation,
        //     backColor: '',
        // },
        {
            buttonText: 'user',
            destination: 'Profile',
            navigation: navigation,
            backColor: Colors.Yellow.background,
        },
        {
            buttonText: 'bell',
            destination: 'Notifications',
            navigation: navigation,
            backColor: Colors.Green.background,
        },
        {
            buttonText: 'plus',
            destination: 'AddEvent',
            navigation: navigation,
            backColor: Colors.Blue.background,
        },
        {
            buttonText: 'question',
            destination: 'About',
            navigation: navigation,
            backColor: Colors.Red.background,
        },
        {
            buttonText: 'sign-out',
            destination: showModal,
            navigation: navigation,
            backColor: Colors.Pourple.background,
        },
    ]
}