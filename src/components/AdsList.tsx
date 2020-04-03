interface AdsType{
    source:string,
    link:string,
    text:string,
}

let AdsList:Array<AdsType> = [
    {source:'https://i.ibb.co/T8n07G2/ad1.jpg', 
    link:'https://linkedin.com/comapny/websitoz/',
    text:'Website'},
    {source:'https://i.ibb.co/hCZxtrN/ad2.jpg', 
    link:'https://linkedin.com/comapny/websitoz/',
    text:'Learn More'},
    {source:'https://i.ibb.co/DCm1ZYb/ad3.jpg https://i.ibb.co/Vp5Hs9k/ad4.jpg', 
    link:'https://linkedin.com/comapny/websitoz/',
    text:'Order Now'},
    {source:'https://i.ibb.co/Vp5Hs9k/ad4.jpg', 
    link:'https://linkedin.com/comapny/websitoz/',
    text:'Listen Now'},
    {source:'https://i.ibb.co/NVGwvVB/ad5.jpg', 
    link:'https://linkedin.com/comapny/websitoz/',
    text:'Install'},
    {source:'https://i.ibb.co/xFgqHb4/ad6.jpg', 
    link:'https://linkedin.com/comapny/websitoz/',
    text:'Follow'},
]

function GiveAd(){
    let index = Math.floor(Math.random() * ((AdsList.length-1) - 0 + 1) + 0);

    return AdsList[index]
}

export default GiveAd;