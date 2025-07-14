# RTOS

Quando fazermos uso do RTOS devemos nos atentar a algumas questões de qualidade de código, mais especificamente quando estamos lidado com um RTOS específico, como o FreeRTOS no nosso caso.

## FreeRTOS

!!! note "Rule 4.1"
    Toda chamada de funções referentes FreeRTOS de uma função deve utilizar a API com o sufixo `FromISR`

Ao trabalhar com FreeRTOS, surge um desafio específico: a utilização de uma API especial ao lidar com interrupções, especificamente as funções que terminam em "FromISR". A decisão sobre quando empregar cada conjunto de funções pode inicialmente parecer simples, mas na verdade exige uma compreensão detalhada do código. Frequentemente, não é claro se uma função pertence a um callback de software ou hardware, complicando o processo de desenvolvimento.

Para mitigar esse problema, a regra `rtosMissingFromISR` foi estabelecida, visando corrigir a omissão comum em submissões onde as funções apropriadas do FreeRTOS não são utilizadas dentro de rotinas de serviço de interrupção (ISR). Isso previne potenciais falhas decorrentes do uso incorreto da API.

!!! note "Rule 4.2"
    Toda chamada de funções referentes FreeRTOS de uma task ==não deve== utilizar a API com o sufixo `FromISR`

Adicionalmente, há casos em que as funções específicas para ISR são usadas indevidamente em situações onde a API padrão do FreeRTOS deveria ser aplicada. A regra `rtosWrongUseOfFromISR` é implementada para assegurar que as funções padrão do FreeRTOS sejam empregadas nos contextos apropriados, evitando o uso indevido de funções específicas para ISR em operações de tarefa regulares.

!!! note "Rule 4.3"
    Quando utilizamos um RTOS não precisamos mais de nenhuma variável global, que não for um recurso do RTOS.
    
Esta abordagem dupla na aplicação de regras é crucial para aprimorar a compreensão e aplicação correta das APIs do FreeRTOS. Além disso, o RTOS oferece recursos de comunicação entre diferentes partes do código, como filas e semáforos, facilitando a comunicação entre ISR e tarefas/funções principais. Isso reduz a necessidade de variáveis globais, aumentando a segurança e a eficiência energética do código. A regra `rtosWrongUseGlobalVar` visa verificar a presença de variáveis globais inadequadas, promovendo melhores práticas de design em programas baseados em RTOS.
