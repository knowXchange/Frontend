
<template>
    <div>
    <topbar/>
    <mybar/>
    
    <header class="bg-dark text-center py-4 mb-4">
        <div class="container">
            <h1 class="font-weight-light text-white">Ayuda</h1>
        </div>
    </header>

    <Accordion>
	<AccordionTab header="Descripción del problema o de la necesidad">
        <p>
            Con el auge de las tecnologías de la información se han dado cambios importantes en cómo se brinda educación, actualmente la oferta de educación online es diversa, existiendo diferentes plataformas como Coursera, Udemy y Platzi que ofrecen formación online.

            Páginas como Coursera y Platzi ofrecen contenidos de buena calidad con un enfoque académico y formal pero tienen la desventaja de que el nivel de interacción y retroalimentación es bajo ya que se basan en el autoaprendizaje.

        </p>

		<p>

            Por otro lado, varias de estas páginas operan bajo un modelo de negocio basado en la venta de cursos y suscripciones.

            En respuesta a esto KnowXchange se plantea como una alternativa educativa que pretende una enseñanza sencilla y gratuita donde lo más importante es la interacción entre las personas.

        </p>
        
	</AccordionTab>
	<AccordionTab header="Header II">
		Content
	</AccordionTab>
	<AccordionTab header="Header III">
		Content
	</AccordionTab>
</Accordion>



    </div>
</template>
<script>

import Mybar from '../components/Mybar.vue'


export default {
    name: 'help',
    components: {
        Mybar
    },
}
</script>
<style>
</style>