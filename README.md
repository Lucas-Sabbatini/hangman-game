# Hangman Game, como funciona?

<p>
 Tudo aqui começa quando se clica no botão de pesquisar no campo de input, depois disso o front-end manda a palavra pesquisada para o back, utilizando a tecnologia websocket, que tive de estudar bastante sobre a solução.

 Agora já com a palvra em mãos o back-end faz uma requisição de pesquisa à API do Twitter, que tem como resposta um JASON com alguns poucos twitts, e outras duas informações sobre eles: o id de cada twitt e o link para o twitt no próprio twitter. Essa etapa do serviço ainda tem o dever de descartar o id e chamar o próximo programa tendo como input o conteúdo bruto dos twitts adiquiridos com a requisição.

 Depois dessa requisição e filtragem inicial outro programa é executando para gerar uma única palavra secreta. No processo de construção dessa etapa eu desocbri um tipo de programa muito interessante chamado "word tagger", esse programa é capaz de classificar a classe gramatical das palavras. Então ,com um pouco de pesquisa, eu achei um repositório no github com um modelo já treinado e pronto para ser usado na nossa língua portuguesa. Depois disso era só colocar esse programa ao meu favor: fiz com que ela descartasse cada palavra que não fosse um substantivo e escolhesse o substantivo com o maior número de palavras, e essa palavra é a que você tem que adivinhar no jogo!

 Por fim, além disso tudo que eu já falei, esse projeto foi hospedado na hostinger, em uma vps, então eu tive de aprender bastante sobre o sistema operacional linux e como disponibilizar o projeto para que toda a internet possa acessar. Atualmente, o projeto não está mais disponível na internet pois o um ano pago na hospedagem já expirou e eu optei por não renovar o serviço.
</p>
