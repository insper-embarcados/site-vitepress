import{_ as i,c as a,o as e,ae as n}from"./chunks/framework.fqSCwWg6.js";const o="/insper-embarcados/site-vitepress/assets/checker-rule-head.CwdFQbI8.png",t="/insper-embarcados/site-vitepress/assets/head-file-1.BEJOhMJU.png",d="/insper-embarcados/site-vitepress/assets/head-file-2.BgbxOJ1V.png",m=JSON.parse('{"title":"Head File","description":"","frontmatter":{},"headers":[],"relativePath":"qualidade/head-file.md","filePath":"qualidade/head-file.md"}'),p={name:"qualidade/head-file.md"};function l(r,s,c,h,k,u){return e(),a("div",null,s[0]||(s[0]=[n(`<h1 id="head-file" tabindex="-1">Head File <a class="header-anchor" href="#head-file" aria-label="Permalink to &quot;Head File&quot;">​</a></h1><p>!!! note &quot;Rule 2.0&quot; Todo <em>head file</em> (<code>.h</code>) deve ser criado com include guard.</p><p>!!! note &quot;Rule 2.1&quot; Não ter implementação de código em <em>head file</em> (<code>.h</code>).</p><p><code>Head file</code> (<code>.h</code>) é um arquivo de texto com códigos C que será processado de forma diferente do arquivo <code>.c</code> e que possibilita a melhor estruturação de um programa, sendo possível estruturar o código de uma forma mais organizada, possibilitando a criação de bibliotecas (nada parecido com python), deixando o programa mais estruturado.</p><p>Para isso funcionar direito o <em>head file</em> deve possuir um recurso que iniba a inclusão redundante (mais de uma vez) no processo de compilação, evitando a redefinição de <code>defines</code>, <code>tipos</code> ou funções. Além desse recurso, não podemos ter no arquivo <code>.h</code> códigos que gerem instruções (ou seja, não podemos implementar uma função no <code>head</code>)!</p><h2 id="exemplo" tabindex="-1">Exemplo <a class="header-anchor" href="#exemplo" aria-label="Permalink to &quot;Exemplo&quot;">​</a></h2><p>O exemplo a seguir demonstra um ==uso errado== do arquivo <code>.h</code>:</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// main.h</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> var; </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> bar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (b </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// main.c</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#include</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;main.h&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">){</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> bar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">12</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>O código anterior viola a regra <strong>2.0</strong> e a regra <strong>2.1</strong> gerando o seguinte erro:</p><p><img src="`+o+'" alt=""></p><h2 id="forma-correta" tabindex="-1">Forma correta <a class="header-anchor" href="#forma-correta" aria-label="Permalink to &quot;Forma correta&quot;">​</a></h2><p>Para desenvolvermos bons códigos em C devemos usar a seguinte estrutura de arquivos <code>.c</code> e <code>.h</code>:</p><ul><li><code>.c</code>: É onde efetivamente implementamos nossos códigos que geram instruções.</li><li><code>.h</code>: Arquivo de cabećalho que auxilia na organizacão do código.</li></ul><p>!!! warning Toda implementação de função deve ocorrer no arquivo <code>.c</code>!</p><p>O diagrama a seguir ilustra como devemos tratar os diferentes tipos de arquivos:</p><p><img src="'+t+'" alt=""></p><p>Estes arquivos quando compilados devem gerar <a href="./.html">arquivos .o</a>[^1], reparem que o arquivo <code>foo.c</code> virou um objeto <code>foo.o</code>, isso otimiza todo o processo de compilação, o gcc não precisa recompilar o <code>foo.c</code> se não ouve mudancas nele.</p><p><img src="'+d+`" alt="" width="100"></p><p>Mas para isso funcionar corretamente temos que implementar algo chamado de <code>include guard</code> nos arquivos <code>.h</code>, o include guard limita a inclusão do <code>head</code> apenas uma vez no processo de compilação. O código correta fica assim:</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// main.c</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#include</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;bar.h&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(){...}</span></span></code></pre></div><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// bar.h</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#ifndef</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> BAR_H</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#define</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> BAR_H</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> bar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#endif</span></span></code></pre></div><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// bar.c</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#include</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;bar.h&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> bar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>!!! exercise choice two-cols Qual o par de códigos correto para um arquivo <code>pisca.c</code> e <code>pisca.h</code> que implementa a funcão <code>void led(void)</code>?</p><pre><code>=== &quot;(a)&quot;
    \`pisca.h\`
    \`\`\`c
    void led(coid){
        pio_set(...); 
        pio_clear(...);
    }
    \`\`\`

    \`pisca.c\`
    \`\`\`c
    #ifndef PISCA_H
    #define PISCA_H
    
    #include &quot;pisca.h&quot;
    
    #endif        
    \`\`\`
    
=== &quot;(b)&quot;

    \`pisca.h\`
    \`\`\`c
    #ifndef PISCA_H
    #define PISCA_H
    
    #include &quot;pisca.h&quot;
    
    #endif
    \`\`\`
    
    \`pisca.c\`
    \`\`\`c
    #include &quot;pisca.h&quot;
    
    void led(coid){
        pio_set(...); 
        pio_clear(...);
    }
    \`\`\`
    
=== &quot;\\(c\\)&quot;
    \`pisca.h\`
    \`\`\`c
    #ifndef PISCA_H
    #define PISCA_H
    
    #include &quot;pisca.h&quot;
    
    void led(coid);
    
    #endif
    \`\`\`
    
    \`pisca.c\`
    \`\`\`c
    #include &quot;pisca.h&quot;
    
    void led(coid){
        pio_set(...); 
        pio_clear(...); 
    }
    \`\`\`
   
- [ ] 
- [ ] 
- [x] 

!!! answer
    O Item (C) é o único que possui todos os itens necessários:
    
    - Arquivo \`.h\` com include guard.
    - Arquivo \`.h\` com prototype das funcões.
    - Arquivo \`.c\` inclui arquivo \`.h\`.
</code></pre><p>!!! exercise choice two-cols Você sabe a diferença entre: <code>#include &quot;foo.h&quot;</code> e <code>#include &lt;foo.h&gt;</code>?</p><pre><code>- [x] Sim
- [x] Não

!!! answer
    Usamos \`&quot; &quot;\` para quando queremos fazer o \`include\` de um arquivo que pertece ao projeto apenas e \`&lt; &gt;\` quando o arquivo é uma biblioteca do sistema!
</code></pre><h2 id="keyword-extern" tabindex="-1">Keyword <em>extern</em> <a class="header-anchor" href="#keyword-extern" aria-label="Permalink to &quot;Keyword *extern*&quot;">​</a></h2><p>!!! tip Para que seu Head file acesse uma variável global que está na <strong>main.c</strong>, você precisa adicionar a keyword <strong>extern</strong> nessa variável dentro do arquivo head <strong>.c</strong>:</p><pre><code>https://www.geeksforgeeks.org/understanding-extern-keyword-in-c/
</code></pre><h2 id="editando-o-cmakelist-txt" tabindex="-1">Editando o CMakeList.txt <a class="header-anchor" href="#editando-o-cmakelist-txt" aria-label="Permalink to &quot;Editando o CMakeList.txt&quot;">​</a></h2><p>Você também vai precisar adicionar <strong>foo.c</strong> no arquivo CMakeList.txt:</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add_executable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(... main.c foo.c ...)</span></span></code></pre></div><h2 id="praticando" tabindex="-1">Praticando <a class="header-anchor" href="#praticando" aria-label="Permalink to &quot;Praticando&quot;">​</a></h2><p>Vamos praticar um pouco e corrigir as regras básicas de qualidade de código e boas práticas em sistemas embarcados, para isso crie um repositório pelo <em>github classroom</em> e então modifique os arquivos conforme indicado.</p><ol><li>Crie um repositório com o código exemplo acessando o github classroom!</li><li>Analise o log do actions e verifique que o cppcheck executou e encontrou alguns erros.</li><li>Corrigir o código e verificar se ainda continuamos com erros.</li></ol>`,36)]))}const E=i(p,[["render",l]]);export{m as __pageData,E as default};
