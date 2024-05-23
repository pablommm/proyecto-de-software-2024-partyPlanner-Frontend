import React,{ReactElement} from "react"

const URL = 'https://wa.me'

interface IProps {
    number: String
    message: String
    children: ReactElement
    onClick?: (event) => void
}

const WhatsAppContact = ({ number, message, children, onClick}: IProps) =>{
    number = 12345

    let url = '${URL}/${number}'

    if (message){
        url += '?text=${encodeURI(message)}'
    }

    return (
        <button
            onClick={(e)=>{
                window.open(url)

                if(onClick){
                    onClick(e)
                }
            }}
        >
            {children}
        </button>
    )

}

export default WhatsAppContact