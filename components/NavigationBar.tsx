import { useState } from "react";
enum DataTheme {
    ThemeOne = 'theme-1',
    ThemeTwo = 'theme-2',
    ThemeThree = 'theme-3',
    ThemeFour = 'theme-4',
    ThemeFive = 'theme-5',
    ThemeSix = 'theme-6',
}
const NavigationBar = () => {
    const [currentTheme, setCurrentTheme] = useState("")
    const changeTheme = (themeColor: DataTheme) => {
        document.documentElement.setAttribute('data-theme', themeColor);
        setCurrentTheme(themeColor)
        console.log(currentTheme);
    }
    return (
        <>
            <section className="main-header">
                <section className="themes-container-left">
                    <button onClick={() => { changeTheme(DataTheme.ThemeOne) }}></button>
                    <button onClick={() => { changeTheme(DataTheme.ThemeTwo) }}></button>
                    <button onClick={() => { changeTheme(DataTheme.ThemeThree) }}></button>

                </section>
                <h3 className="app-name">Weather App</h3>
                <section className="themes-container-right">
                    <button onClick={() => { changeTheme(DataTheme.ThemeFour) }}></button>
                    <button onClick={() => { changeTheme(DataTheme.ThemeFive) }}></button>
                    <button onClick={() => { changeTheme(DataTheme.ThemeSix) }}></button>

                </section>
            </section>
        </>
    )
}
export default NavigationBar