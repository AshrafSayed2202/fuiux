import AboutTitle from "../ui/AboutTitle"

const TitlesSection = () => {
    return (
        <div className=" bg-zinc-950 flex flex-col items-center justify-center overflow-x-hidden">
            <AboutTitle name='Ui/Ux' />
            <AboutTitle name='Designer' />
            <AboutTitle name='+' />
            <AboutTitle name='Creative' />
            <AboutTitle name='Product' />
            <AboutTitle name='Lead' />
        </div>
    )
}
export default TitlesSection