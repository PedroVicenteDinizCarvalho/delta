
--------------------------------- RODAR PROJETO ---------------------------------

1- Clonar o repositório dentro de uma pasta do servidor utilizado -> Xampp ou Wamp 

2- Criar banco de dados de acordo com o arquvio application/config/database.php - este arquivo pode ser modificado mas seu BD precisa seguir as alterações

3- Dentro da pasta assets/my-app rodar o comando (npm install)

4- Ainda no mesmo diretório rodar (npm start)

----------------------------------- Observações -----------------------------------

1- A função de salvar imagens não está funcionando corretamente. Por nunca ter utilizado codeigniter e react, tive dificuldades para salvar a imagem em seus diretórios, mesmo utilizando as funções nativas do codeiginiter para salvar arquivos. 
O principal problema que encontre foi em relação a transferência do arquivo para o backend utilizando (JSON.stringify).
