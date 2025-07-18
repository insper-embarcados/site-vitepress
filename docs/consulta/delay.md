# Delay


Material de apoio: 
[datasheet]( https://www.raspberrypi.com/documentation/pico-sdk/hardware.html#hardware_timer) 

É muito comum em sistemas embarcados termos que "gastar tempo" ou esperar um instante específico para realizarmos alguma ação. Por exemplo, ao piscar um LED, não podemos simplesmente acionar e apagar o LED na velocidade máxima que o processador trabalha; caso contrário, não seríamos capazes de enxergar o LED piscando. Nosso processador, por exemplo, opera com um clock de 125 MHz, executando 3.3 milhões de instruções por segundo.

Existem diversas formas de "contar tempo" em um microcontrolador. A principal maneira é gastarmos ciclos de clock, ou seja, usamos o processamento para não fazermos nada! Isso normalmente é feito em assembly, onde conseguimos controlar exatamente quantas instruções iremos gastar para dar o tempo necessário.

::: info
Delays são ineficientes do ponto de vista de energia, já que estamos literalmente gastando energia para não fazer nada. Além disso, são ineficientes em termos de desempenho, pois não conseguimos realizar outra tarefa enquanto aguardamos o tempo passar.
    
Uma solução para o problema de consumo de energia é fazer com que o microcontrolador (uC) entre em modo de suspensão (sleep mode) durante o período em que desejamos que ele fique inativo. Quanto ao problema de desempenho, podemos utilizar um periférico de temporização para contar o tempo. Enquanto o temporizador está ativo, o microcontrolador pode executar outra função, otimizando assim o uso dos recursos do sistema.
:::

A biblioteca SDK da Pico possui algumas funções de delays de software, sendo as principais do tipo `sleep` (que coloca o core para dormir por uma quantidade de tempo) e `busy_wait` (que apenas "gasta" clocks para dar o tempo necessário).

## Snippets

Snippets de código relacionados ao GPIO.

::: tip Quando usar cada um?
Se você precisa de um controle preciso sobre o tempo de espera, utilize o `busy_wait`. Essa abordagem garante que o tempo de espera seja exatamente o que você programou, mas consome mais energia, pois o microcontrolador permanece ativo. Por outro lado, se a precisão do tempo de espera não for crítica e você quiser economizar energia, opte pelo `sleep`. Essa função coloca o microcontrolador em modo de suspensão, reduzindo o consumo de energia.
:::  

### sleep

Fazer o core dormir por um determinado tempo:

```c
sleep_us (30); // 30 us de sleep
sleep_ms (40); // 40 ms de sleep
```

### busy_wait

Ou gastar clocks da cpu:

```c
busy_wait_us(30); // 30 us de clocks gastos
busy_wait_ms(40); // 40 ms de clocks gastos
```

