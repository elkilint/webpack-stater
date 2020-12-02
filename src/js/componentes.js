import '../css/componentes.css';



export const saludar = ( nombre ) => {

    console.log('Creando etiqueta h1, en el HTML!');

    const h1 = document.createElement('h1');
    h1.innerText = `Repositorio de aplicaciones  ${ nombre }`;

    document.body.append( h1 );

}