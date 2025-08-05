# GPIO - IRQ

Em computação, frequentemente surge a necessidade de realizar ações com base em eventos. Esses eventos podem ser classificados como internos ou externos ao processador/microcontrolador. Por exemplo, o término de um cálculo realizado por um dos núcleos de um processador multicore ou a detecção de um overflow de memória são exemplos de eventos internos ao CORE (processador). Por outro lado, a notificação de um novo pacote recebido pela comunicação Ethernet ilustra um evento externo ao CORE.

A estruturação de um programa orientada a eventos oferece várias vantagens ao programador:

1. Independência entre as diferentes partes do programa.
1. Facilidade de modificação e atualização.
1. Definição clara de prioridades.
1. Melhoria na correlação entre o código e a documentação.

Nesse paradigma, define-se funções específicas para determinados eventos, que são executadas quando esses eventos são detectados. As funções/eventos podem ter diferentes níveis de prioridade, permitindo ao programador estabelecer quais devem ser executadas primeiro em caso de eventos simultâneos.

Por exemplo, é possível definir uma função que é acionada sempre que chega um dado pela porta Ethernet e outra que reage ao pressionamento de um botão. Também se podem estabelecer eventos periódicos, como a execução de uma função a cada X segundos (por exemplo, para piscar um LED).

## Embarcados

Em computadores, os eventos são geralmente gerenciados pelo sistema operacional (OS), como Linux, Windows, entre outros. Porém, em sistemas embarcados, nem sempre dispomos de um sistema operacional, ou não podemos tolerar a latência associada à troca de contexto do OS (nada é de graça!). Para esses casos, existem as interrupções de hardware, que são chamadas de funções (ou eventos) executadas pelo microcontrolador (uC) em resposta a eventos detectados pelos periféricos. Embora essas interrupções também ocorram em computadores, nelas o OS geralmente gerencia tudo.

Por exemplo, é possível configurar o uC para que, toda vez que um botão for pressionado (ou seja, quando houver uma mudança de estado de HIGH para LOW), uma função específica (conhecida como `handler`) seja executada. Isso elimina a necessidade de verificar constantemente a mudança de estado do pino em um loop `while(1)`, técnica conhecida como polling. O uso de interrupções abre portas para uma série de otimizações, sendo a economia de energia uma das principais vantagens.

O estilo de programação que consiste em verificar repetidamente uma mudança de estado é chamado de **polling**, método que foi utilizado nos laboratórios realizados até agora.

``` c
while(1){
  if(gpio_get(BTN))
    gpio_set(LED, 1);
  else
    gpio_set(LED, 0);
};
```

::: highlight
Nesse exemplo de código, fica-se constantemente checando por alterações no registrador do GPIO responsável pelo botão, a fim de decidirmos se o LED ficará aceso ou apagado. O CORE está constantemente trabalhando para executar essas operações.
:::

## IRQ

Interruption Request (IRQ) é o nome que se dá para quando uma interrupção é requisitada pelo hardware. Esta é uma parte fundamental dos sistemas embarcados, pois permite que o hardware notifique o software sobre um evento que necessita atenção imediata. Quando um dispositivo periférico precisa que o processador execute uma tarefa, ele envia um sinal de IRQ ao processador. O processador, por sua vez, temporariamente interrompe o que está fazendo para tratar essa interrupção.

Na prática, quando uma IRQ é gerada, a nossa função main é interrompida e uma função especial chamada de `callback` ou `handler` é executada automaticamente. Essa abordagem garante que o sistema possa responder rapidamente a eventos externos ou internos que requerem atenção imediata, sem que seja necessário o constante monitoramento desses eventos pelo loop principal do programa.

Após a ISR ser executada, o sistema realiza uma operação de retorno de interrupção, que restaura o estado do processo anteriormente salvo, permitindo que o programa retome sua execução do ponto onde foi interrompido.

Analise o exemplo a seguir onde o programa imprime `Hello` sempre que o botão for pressionado, mas note que não existe nenhum código no `while(1)`!!

```c
#include <stdio.h>
#include "pico/stdlib.h"
#include "hardware/gpio.h"

// ...

void btn_callback(uint gpio, uint32_t events) {
  printf("Hello! \n");
}

int main() {
  stdio_init_all();
  
  // pin init..
  // ...
  
  while (true) {
  }
}
```

## Keep it short and simple 

O tempo que um firmware deve ficar na interrupção deve ser o menor possível, pelos seguintes motivos principais:

1. Outras interrupções de mesma prioridade irão aguardar o retorno da interrupção. O firmware irá deixar de servir de maneira rápida a diferentes interrupções se gastar tempo nelas.
2. Nem todas as funções [são reentrantes](https://en.wikipedia.org/wiki/Reentrancy_(computing)). Funções como `printf` podem ==não operar== corretamente dentro de interrupções, pois podem ser chamadas mais de uma vez sem terem terminado de executar.
3. RTOS: As tarefas devem ser executadas em tasks e não nas interrupções, possibilitando assim um maior controle do fluxo de execução do firmware (vamos ver isso mais para frente).


::: highlight
Para maiores informações acesse: https://betterembsw.blogspot.com/2013/03/rules-for-using-interrupts.html
:::

### Soluções

Existem algumas soluções para essa questão. A mais simples delas é realizar o processamento de uma interrupção no loop principal (`while(1)`); essa abordagem é muito utilizada em sistemas embarcados e deve ser feita da seguinte forma:

- Define-se uma variável global que servirá como `flag` (`true` ou `false`) e, **importante, essa variável precisa ser do tipo `volatile`**
- Interrupção altera o status da `flag` para True (`1`).
- `while(1)` verifica status da `flag` para realizar ação.
- `while(1)` volta a `flag` para o estado original False.

Analise o exemplo a seguir que ilustra o uso de flags para tratar o evento no botão:

```c{2,6,16,18}
/* flag */
volatile char g_but_flag; // (1)

/* funcao de callback/ Handler */
void btn_callback(uint gpio, uint32_t events) {
  g_but_flag = 1;
}

void main(void){
  /* Inicializacao */
  // ...
  // ...

  while(1){
  
   if (g_but_flag) {  // (2)
       pisca_led(5, 200);    
       g_but_flag = 0; // (3)
   }
  }
}
```

1. Note que a variável que será utilizada como flag foi declarada como volatile
1. O bloco de código dentro do if só será processado quando o but_flag for True
1. ⚠️ Essa linha é muito importante, pois sem ela o bloco do if seria executado novamente sem o evento externo do botão.

::: info volatile
Sempre que uma interrupção alterar uma variável global, essa deve possuir o 'pragma'/modificador [`volatile`](https://barrgroup.com/Embedded-Systems/How-To/C-Volatile-Keyword).
    
Exemplo: `volatile int valADC;`
    
Esse pragma serve para informar ao compilador (no nosso caso, GCC) que essa variável será modificada sem que o compilador saiba, evitando assim que a variável não seja otimizada incorretamente.
    
Compiladores são projetados para otimizar programas removendo trechos ou variáveis desnecessárias. Como a função de `Handler` (interrupção) nunca é chamada diretamente pelo programa, o compilador pode supor que essa função nunca será executada e pode otimizar a variável que nela seria atualizada (já que não é chamada diretamente, mas sim pelo hardware quando ocorre um evento).
    
- Leia mais sobre [volatile](https://barrgroup.com/Embedded-Systems/How-To/C-Volatile-Keyword)

::: highlight
***ATENÇÃO: só usar `volatile` quando necessário uma IRQ altera o valor de uma variável.***
:::

## Snippets

Snippets relacionados a interrupção do GPIO.

### GPIO - IRS

Muda o valor do LED toda vez que o botão for apertado.

- Necessário definir os pinos `LED_PIN` e `BTN_PIN`

[Simulação no wokwi](https://wokwi.com/projects/382410733969358849){.ah-button}
/ [pico-examples/gpio/hello_gpio_irq](https://github.com/raspberrypi/pico-examples/blob/master/gpio/hello_gpio_irq/hello_gpio_irq.c){.ah-button}

::: tip "Bordas"
Você pode configurar qual tipo de borda deseja ativar na IRQ:

- `GPIO_IRQ_EDGE_FALL`: Descida (Botão apertado) 
  - `event: 0x04`
- `GPIO_IRQ_EDGE_RISE`: Subida  (Botão solto)
    - `event: 0x08`
- `GPIO_IRQ_EDGE_FALL | GPIO_IRQ_EDGE_RISE`: Subida e descida
    - `event: 0x04 + 0x08`
:::


```c
#include <stdio.h>
#include "pico/stdlib.h"
#include "hardware/gpio.h"

#define LED_PIN 5 
#define BTN_PIN 26 

volatile int g_status = 0;

void gpio_callback(uint gpio, uint32_t events) {
    if (events == 0x4) {         // fall edge
        g_status = 1;
    } else if (events == 0x8) {  // rise edge
        
    }
}

int main() {
  stdio_init_all();

  gpio_init(BTN_PIN);
  gpio_set_dir(BTN_PIN, GPIO_IN);
  gpio_pull_up(BTN_PIN);
  gpio_set_irq_enabled_with_callback(BTN_PIN, 
                                     GPIO_IRQ_EDGE_RISE | 
                                     GPIO_IRQ_EDGE_FALL, 
                                     true,
                                     &gpio_callback);
    
  gpio_init(LED_PIN);
  gpio_set_dir(LED_PIN, GPIO_OUT);

  int led_status = 0;
  while (true) {
    if (g_status){
      g_status = 0; // clean IRS flag
      led_status = !led_status;
      gpio_put(LED_PIN, led_status);
    }
  }
}
```

### GPIO - IRQ - Múltiplos callbacks

Só podemos configurar um único callback para os GPIOS da pico, devemos usar a informação do argumento `gpio` para sabermos qual pino estamos lidando dentro do callback.

::: tip
Notem que **não estamos usando** a informação de `event`, pois as duas IRQs foram configuradas na mesma borda. Caso contrário, deveriam tratar essa informação.
:::

[Simulação no wokwi](https://wokwi.com/projects/390522233591216129){.ah-button}

```c
#include <stdio.h>
#include "pico/stdlib.h"
#include "hardware/gpio.h"

#include <stdio.h>
#include "pico/stdlib.h"
#include "hardware/gpio.h"

const int BTN_PIN_R = 28; 
const int BTN_PIN_G = 26; 
const int LED_PIN_R = 4; 
const int LED_PIN_G = 6; 

volatile int g_flag_r = 0;
volatile int g_flag_g = 0;

void pin_init(void);

void btn_callback(uint gpio, uint32_t events) {
    if (gpio == BTN_PIN_R) {     
        g_flag_r = 1;
    } else if (gpio == BTN_PIN_G) {
        g_flag_g = 1;
    }
}

int main() {
  stdio_init_all();
  pin_init();

  gpio_set_irq_enabled_with_callback(BTN_PIN_R,
                                     GPIO_IRQ_EDGE_FALL,
                                     true,
                                     &btn_callback);
  // Segunda IRQ usa callback já configurado.
  gpio_set_irq_enabled(BTN_PIN_G,
                        GPIO_IRQ_EDGE_FALL,
                        true);

  while (true) {
    if(g_flag_r || g_flag_g) {
      printf("IRQ 0: %d | IRQ 1: %d\n", g_flag_r, g_flag_g);
      
      // clear flags
      g_flag_r = 0;
      g_flag_g = 0;
    }
  }
}

void pin_init(void){
  gpio_init(BTN_PIN_R);
  gpio_set_dir(BTN_PIN_R, GPIO_IN);
  gpio_pull_up(BTN_PIN_R);

  gpio_init(BTN_PIN_G);
  gpio_set_dir(BTN_PIN_G, GPIO_IN);
  gpio_pull_up(BTN_PIN_G);
}
```
