# Pico examples

A raspberry pi fundation disponibiliza oficialmente uma série de códigos exemplos para a nossa placa, acesse o repositório no github para saber mais:

- https://github.com/raspberrypi/pico-examples

::: tip
A pico atualizou a biblioteca dela, vocês vão precisar dar um checkout para uma versão antiga do pico examples:

No termminal:

```
git checkout c95295f830a68a4854f822f07ef1b9b5abc3079e
```
:::

## Usando exemplos

Para usar o exemplos na nossa infra é preciso clonar o repositório e criar um diretório chamado `.devcontainer` com o arquivo `devcontainer.json` com o  seguinte conteúdo:

- [./devcontainer/devcontainer.json](
https://github.com/insper-embarcados/pico-base-project/blob/main/.devcontainer/devcontainer.json)

::: tip
Todos os códigos que disponibilizamos para vocês na disciplina possuem esse diretório, vocês podem apenas copiar o mesmo para o repositório clonado.
:::

Agora com o `.devcontainer` configurado seremos capaz de abrir a pasta no container e compilar e usar os exemplos, antes só precisamos configurar que a placa que possuímos é a versão `W`, ou seja, possui o módulo de WIFI e BlueTooth.

Então modifique o arquivo `CMakeLists.txt` e adicione na segunda linha `set(PICO_BOARD pico_w)` como demonstrado a seguir:

```diff
cmake_minimum_required(VERSION 3.12)

+set(PICO_BOARD pico_w)
```

### .vscode/

Para gravar e debugar (RUN AND DEBUG) os exemplos dentro do vscode na nossa infra, é preciso também fazer o download do repositório no link abaixo e descompactar o mesmo no repositório clonado:

- [.vscode/.vscode.zip](https://insper-my.sharepoint.com/:u:/g/personal/marcoasma_insper_edu_br/EY1GhgGok2lJgQcrGaubDMsBBjT1rsQQA2Yry2DCxlvrSQ?e=Im28Cq)

::: tip
Todos os códigos que disponibilizamos para vocês na disciplina possuem esse diretório, vocês podem apenas copiar o mesmo para o repositório clonado.
:::

## pico extras

Alguns exemplos ainda estão em fase de testes e estão disponibilizados em um outro repositório:

- [raspberrypi/pico-extras](https://github.com/raspberrypi/pico-extras/tree/master)
