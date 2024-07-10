# Hangman Game - Como Funciona?
<p>
Tudo começa quando o usuário clica no botão de pesquisa no campo de entrada. Após isso, o front-end envia a palavra pesquisada para o back-end utilizando a tecnologia WebSocket, a qual foi estudada profundamente para implementar essa solução.
O back-end, desenvolvido em Node.js, recebe a palavra e realiza uma requisição de pesquisa à API do Twitter. A resposta dessa requisição é um JSON contendo alguns tweets e duas informações adicionais sobre eles: o ID de cada tweet e o link para o tweet no próprio Twitter. Nesta etapa, o serviço descarta o ID e encaminha o conteúdo bruto dos tweets adquiridos para o próximo programa.

Após a requisição e filtragem inicial, um outro programa, escrito em Python, é executado para gerar uma única palavra secreta. Durante o desenvolvimento desta etapa, foi descoberto um tipo de programa muito interessante chamado "word tagger", que é capaz de classificar a classe gramatical das palavras. Com alguma pesquisa, foi encontrado um repositório no GitHub com um modelo já treinado e pronto para ser usado na língua portuguesa. A partir daí, o programa foi adaptado para descartar todas as palavras que não fossem substantivos e selecionar o substantivo com o maior número de ocorrências, que é a palavra que o usuário deve adivinhar no jogo.

Por fim, além de todo o desenvolvimento descrito, o projeto foi hospedado na Hostinger, em uma VPS, o que exigiu um aprendizado significativo sobre o sistema operacional Linux e como disponibilizar o projeto para acesso público na internet. Atualmente, o projeto não está mais disponível online, pois o período de um ano pago pela hospedagem expirou e a renovação do serviço não foi efetuada.

</p>
