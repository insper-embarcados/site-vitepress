# Pico examples

A Raspberry Pi Foundation disponibiliza oficialmente uma série de códigos de exemplo para a nossa placa. Acesse o repositório no GitHub para saber mais:

- https://github.com/raspberrypi/pico-examples

::: tip

A Pico atualizou a biblioteca dela, então vocês vão precisar dar um checkout para uma versão antiga do pico-examples:

No terminal:

```
git checkout c95295f830a68a4854f822f07ef1b9b5abc3079e
```
:::

## Usando exemplos

Para usar os exemplos na nossa infraestrutura, é preciso clonar o repositório e criar um diretório chamado `.devcontainer` com o arquivo `devcontainer.json` com o seguinte conteúdo:

- [./devcontainer/devcontainer.json](
https://github.com/insper-embarcados/pico-base-project/blob/main/.devcontainer/devcontainer.json)

::: tip
Todos os códigos que disponibilizamos para vocês na disciplina possuem esse diretório, vocês podem apenas copiar o mesmo para o repositório clonado.
:::

Agora, com o `.devcontainer` configurado, seremos capazes de abrir a pasta no container, compilar e usar os exemplos. Antes, só precisamos configurar que a placa que possuímos é a versão `W`, ou seja, possui o módulo de Wi-Fi e Bluetooth.

Então, modifique o arquivo `CMakeLists.txt` e adicione na segunda linha `set(PICO_BOARD pico_w)`, como demonstrado a seguir:

```diff
cmake_minimum_required(VERSION 3.12)

+set(PICO_BOARD pico_w)
```

### .vscode/

Para gravar e debugar (RUN AND DEBUG) os exemplos dentro do VS Code na nossa infraestrutura, é preciso também fazer o download do repositório no link abaixo e extrair o mesmo no repositório clonado:

- [.vscode/.vscode.zip](https://insper-my.sharepoint.com/:u:/g/personal/marcoasma_insper_edu_br/EY1GhgGok2lJgQcrGaubDMsBBjT1rsQQA2Yry2DCxlvrSQ?e=Im28Cq)

::: tip
Todos os códigos que disponibilizamos para vocês na disciplina possuem esse diretório. Vocês podem apenas copiar o mesmo para o repositório clonado.
:::

## pico extras

Alguns exemplos ainda estão em fase de testes e estão disponibilizados em outro repositório:

- [raspberrypi/pico-extras](https://github.com/raspberrypi/pico-extras/tree/master)
