import AboutTitle from "../ui/AboutTitle"

const TitlesSection = () => {
    return (
        <div className="w-full bg-zinc-950 flex flex-col items-center justify-center overflow-x-hidden px-4 sm:px-0 py-10 sm:py-0">
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