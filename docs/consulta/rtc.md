# RTC - Real Time Clock

O RTC é um periférico que muitos microcontroladores possuem e foi desenvolvido para contar o tempo como um relógio e calendário. A base de tempo do RTC é de 1 segundo e, a partir de uma data definida como inicial, ele passa a fazer todas as contas de horas e dias. Em produtos, o RTC é normalmente alimentado por um sistema de baterias independentes, geralmente uma bateria [CR padrão].

::: info
Já se perguntou por que, mesmo quando a bateria do seu notebook acaba, ao ligar, a hora e o dia da semana estão sempre certos? Seu notebook possui um RTC alimentado por uma bateria independente que pode durar meses com a mesma carga, pois ela só alimenta o RTC. Quando você liga novamente o seu computador, a BIOS lê o valor do RTC e atualiza o seu sistema operacional!
:::
    
Existem muitos modelos de RTC disponíveis, cada um com uma configuração diferente (consumo energético, preço, precisão, etc.). Aqui iremos aprender a usar o RTC que está disponível dentro da RP2040 (como um periférico do microcontrolador).

Com o RTC, temos, além de uma base de tempo e calendário, a opção de configurarmos um alarme (IRQ) quando uma situação específica ocorrer. Imagine o seguinte: você precisa fazer uma verificação a cada minuto; podemos configurar o RTC para gerar uma IRQ a cada minuto e realizar a ação.

## Hardware APIs

Breve resumo da API de hardware para manipular o RTC, extraído da documentação SDK:

- `void rtc_init(void)`: Inicializa o sistema RTC.
- `bool rtc_set_datetime(datetime_t *t)`: Define o RTC para o tempo especificado.
- `bool rtc_get_datetime(datetime_t *t)`: Obtém o tempo atual do RTC.
- `bool rtc_running(void)`: O RTC está em execução?
- `void rtc_set_alarm(datetime_t *t, rtc_callback_t user_callback)`: Define um tempo futuro para o RTC chamar um callback fornecido pelo usuário.
- `void rtc_enable_alarm(void)`: Ativa o alarme do RTC (se inativo).
- `void rtc_disable_alarm(void)`: Desativa o alarme do RTC (se ativo).

## Configurando `cmake`

Para utilizar o `RTC`, você deve editar o arquivo `CMakeLists.txt` adicionando `hardware_rtc` ao `target_link_libraries`, como no exemplo a seguir:

```txt
target_link_libraries(main pico_stdlib hardware_rtc)
```

No arquivo `main.c`, adicionar:

```c
#include "hardware/rtc.h"
#include "pico/util/datetime.h"
```

## Snippets

::: warning
O [Wokwi não simula o RTC](https://docs.wokwi.com/pt-BR/parts/wokwi-pi-pico).
:::

Snippets relacionados ao uso do RTC via funções disponíveis na *high level api*.

### RTC com alarme

[pico-examples/rtc/rtc_alarme_repeat](https://github.com/raspberrypi/pico-examples/blob/master/rtc/rtc_alarm_repeat/rtc_alarm_repeat.c)

```c
/**
 * Copyright (c) 2021 Raspberry Pi (Trading) Ltd.
 *
 * SPDX-License-Identifier: BSD-3-Clause
 */

#include <stdio.h>
#include "hardware/rtc.h"
#include "pico/stdlib.h"
#include "pico/util/datetime.h"

static volatile bool fired = false;

static void alarm_callback(void) {
    fired = true;
}

int main() {
    stdio_init_all();
    printf("RTC Alarm Repeat!\n");

    // Start on Wednesday 13th January 2021 11:20:00
    datetime_t t = {
        .year  = 2020,
        .month = 01,
        .day   = 13,
        .dotw  = 3, // 0 is Sunday, so 3 is Wednesday
        .hour  = 11,
        .min   = 20,
        .sec   = 00
    };

    // Start the RTC
    rtc_init();
    rtc_set_datetime(&t);

    // Alarm once a minute
    datetime_t alarm = {
        .year  = -1,
        .month = -1,
        .day   = -1,
        .dotw  = -1,
        .hour  = -1,
        .min   = -1,
        .sec   = 00
    };

    rtc_set_alarm(&alarm, &alarm_callback);

    // Alarm will keep firing forever
    while(1){
    
        if (fired) {
            fired = 0;
            datetime_t t = {0};
            rtc_get_datetime(&t);
            char datetime_buf[256];
            char *datetime_str = &datetime_buf[0];
            datetime_to_str(datetime_str, sizeof(datetime_buf), &t);
            printf("Alarm Fired At %s\n", datetime_str);
        }
    
    }
}
```

