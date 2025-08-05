# ISR - Handler/ Callback 

Essas regras dizem respeito ao fato de que a execução de uma ISR deve ser a mais rápida possível e curta em tamanho de código.

::: tip RULE 3.0
Não pode usar / gerar `delay` de software dentro de uma ISR.
:::

::: tip RULE 3.1
Não pode acessar o OLED ou qualquer outro display de dentro de uma ISR.
:::

::: tip RULE 2.2
Não pode usar `printf` ou `sprintf` de dentro de uma ISR. 
    
::: tip RULE 2.3
Não pode executar laços de código (`while`, `for`) de dentro de uma ISR.
:::

Embora estas regras sejam padrão, elas podem ser flexibilizadas se o impacto do uso desses recursos dentro de uma ISR for mitigado. Por exemplo, se quisermos modificar um vetor pequeno para armazenar mais um valor nele, poderíamos usar um laço. No entanto, é melhor evitar tais práticas.

::: info
Alguns microcontroladores possuem tamanho de memória de código limitado para interrupção. Fique atento a isso ao desenvolver um firmware para microcontroladores mais simples (com arquiteturas de 8/16 bits)!

Alguns desenvolvedores de software usam o princípio *Keep it simple, stupid!* ([**KISS**](https://en.wikipedia.org/wiki/KISS_principle)) em seus projetos. Isso tem alguma semelhança com o que estamos propondo aqui.
:::

## Exemplo

Veja a seguir um exemplo <Badge type="danger" text="errado" /> de uso de interrupção.

```c
#include "asf.h"

int g_cnt = 0;
char g_str[10];

// This code creates a progress bar on an OLED screen that
// increases when the button is pressed.
void btn_callback(void) {
  printf("btn pressed \n"); // printf dentro da ISR

  if (g_cnt >= 8)
    g_cnt = 0;

  int i = 0;
  for (i = 0; i < g_cnt; i++) { // for dentro da ISR
    g_str[i] = '*';
    g_str[i + 1] = '\0';
    delay_ms(50); // delay dentro da ISR
    gfx_mono_draw_string(g_str, 0, 0, &sysfont); // oled dentro da ISR
  }
}

void main(void) {
  // ...

  while (1) {
  }
}
```

O código anterior gera os seguintes erros:

![](figs/checker-rule-isr-kiss.png)

## Praticando

Vamos praticar um pouco e corrigir as regras básicas de qualidade de código e boas práticas em sistemas embarcados. Para isso, crie um repositório pelo *GitHub Classroom* e então modifique os arquivos conforme indicado.

1. Crie um repositório com o código de exemplo acessando o GitHub Classroom.
2. Analise o log do Actions e verifique que o checker executou e encontrou alguns erros.

Agora vamos corrigir os códigos com erro. Execute na ordem:

1. `main_isr_kiss.c`
2. `main_isr_practice.c`

Dica: Crie uma `flag` para indicar que o botão foi pressionado e então reescreva o código na função `main`.
