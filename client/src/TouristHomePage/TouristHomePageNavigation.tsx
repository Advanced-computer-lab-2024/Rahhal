import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils';
import { useState } from 'react'
interface ButtonProps{
    navigation: number,
    setNavigation: (index: number) => void,
    index: number
    buttonName: string
}
export default function TouristHomePageNavigation(){
    const [navigation,setNavigation] = useState(1);
    const buttonNames = ["Experiences","Stays","Travel","Shop"];
    return(
        <>
        <div className="flex justify-center relative z-10 space-x-12 bg-white  h-16 pt-2 items-center">
                {buttonNames.map((buttonName,index) => (
                        <NavigationButton index={index+1} navigation={navigation} setNavigation={setNavigation} buttonName={buttonName} />  
                ))}
          
        </div>
        </>)
}

function NavigationButton(ButtonProps : ButtonProps){
    return( 
        <div className="rounded-full hover:bg-gray-300/60 flex justify-center">
        <Button className={cn("rounded-none rounded-t-md relative w-[7%] text-foreground bg-transparent hover:bg-transparent", ButtonProps.navigation == ButtonProps.index ? "font-semibold" : "text-muted-foreground")} onClick={() => ButtonProps.setNavigation(ButtonProps.index)}> {ButtonProps.buttonName} </Button>
        </div>
    )
}
