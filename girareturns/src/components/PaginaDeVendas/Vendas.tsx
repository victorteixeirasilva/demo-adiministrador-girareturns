import * as React from "react";
const SVGComponent = (props:any) => (
  <svg
    viewBox="0 0 1440 3200"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      background: "linear-gradient(135deg, #f8faf9 0%, #e8f5e9 100%)",
    }}
    {...props}
  >
    <defs>
      <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop
          offset="0%"
          style={{
            stopColor: "#00c853",
            stopOpacity: 1,
          }}
        />
        <stop
          offset="100%"
          style={{
            stopColor: "#00e676",
            stopOpacity: 1,
          }}
        />
      </linearGradient>
      <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop
          offset="0%"
          style={{
            stopColor: "#1b5e20",
            stopOpacity: 1,
          }}
        />
        <stop
          offset="100%"
          style={{
            stopColor: "#2e7d32",
            stopOpacity: 1,
          }}
        />
      </linearGradient>
      <filter id="shadow">
        <feDropShadow dx={0} dy={8} stdDeviation={15} floodOpacity={0.15} />
      </filter>
    </defs>
    <rect width={1440} height={80} fill="#ffffff" opacity={0.95} />
    <text
      x={60}
      y={50}
      fontFamily="Arial, sans-serif"
      fontSize={28}
      fontWeight="bold"
      fill="#00c853"
    >
      {"Gira\xEA"}
    </text>
    <text
      x={1280}
      y={50}
      fontFamily="Arial, sans-serif"
      fontSize={16}
      fill="#2e7d32"
      fontWeight={600}
    >
      {"Solicitar Demo"}
    </text>
    <g id="hero">
      <circle cx={1200} cy={250} r={150} fill="#00c853" opacity={0.08} />
      <circle cx={200} cy={400} r={100} fill="#00e676" opacity={0.06} />
      <text
        x={120}
        y={220}
        fontFamily="Arial, sans-serif"
        fontSize={56}
        fontWeight="bold"
        fill="#1b5e20"
      >
        <tspan x={120} dy={0}>
          {"Transforme sua Opera\xE7\xE3o"}
        </tspan>
        <tspan x={120} dy={70}>
          {"de Economia Circular"}
        </tspan>
      </text>
      <text
        x={120}
        y={400}
        fontFamily="Arial, sans-serif"
        fontSize={24}
        fill="#424242"
        opacity={0.85}
      >
        <tspan x={120} dy={0}>
          {"Software completo para precifica\xE7\xE3o inteligente,"}
        </tspan>
        <tspan x={120} dy={35}>
          {"gest\xE3o de remessas e controle de outlets"}
        </tspan>
      </text>
      <rect
        x={120}
        y={490}
        width={300}
        height={60}
        rx={30}
        fill="url(#greenGradient)"
        filter="url(#shadow)"
      />
      <text
        x={270}
        y={528}
        fontFamily="Arial, sans-serif"
        fontSize={18}
        fontWeight="bold"
        fill="#ffffff"
        textAnchor="middle"
      >
        {"Solicitar Or\xE7amento"}
      </text>
      <text
        x={450}
        y={528}
        fontFamily="Arial, sans-serif"
        fontSize={16}
        fill="#757575"
      >
        {"Investimento: a partir de R$ 4.000"}
      </text>
      <rect
        x={750}
        y={150}
        width={580}
        height={380}
        rx={12}
        fill="#ffffff"
        filter="url(#shadow)"
      />
      <rect x={770} y={170} width={540} height={40} rx={6} fill="#f5f5f5" />
      <circle cx={790} cy={190} r={6} fill="#ff5252" />
      <circle cx={810} cy={190} r={6} fill="#ffc107" />
      <circle cx={830} cy={190} r={6} fill="#00c853" />
      <rect
        x={800}
        y={240}
        width={120}
        height={200}
        rx={4}
        fill="#1976d2"
        opacity={0.8}
      />
      <rect
        x={940}
        y={280}
        width={120}
        height={160}
        rx={4}
        fill="#00c853"
        opacity={0.8}
      />
      <rect
        x={1080}
        y={260}
        width={120}
        height={180}
        rx={4}
        fill="#ffa726"
        opacity={0.8}
      />
      <text
        x={990}
        y={480}
        fontFamily="Arial, sans-serif"
        fontSize={14}
        fill="#757575"
        textAnchor="middle"
      >
        {"An\xE1lise de Precifica\xE7\xE3o"}
      </text>
    </g>
    <g id="stats" transform="translate(0, 600)">
      <rect
        x={100}
        y={0}
        width={320}
        height={180}
        rx={12}
        fill="#ffffff"
        filter="url(#shadow)"
      />
      <text
        x={260}
        y={60}
        fontFamily="Arial, sans-serif"
        fontSize={48}
        fontWeight="bold"
        fill="#00c853"
        textAnchor="middle"
      >
        {"+150%"}
      </text>
      <text
        x={260}
        y={100}
        fontFamily="Arial, sans-serif"
        fontSize={16}
        fill="#616161"
        textAnchor="middle"
      >
        {"Aumento m\xE9dio"}
      </text>
      <text
        x={260}
        y={125}
        fontFamily="Arial, sans-serif"
        fontSize={16}
        fill="#616161"
        textAnchor="middle"
      >
        {"na efici\xEAncia"}
      </text>
      <rect
        x={460}
        y={0}
        width={320}
        height={180}
        rx={12}
        fill="#ffffff"
        filter="url(#shadow)"
      />
      <text
        x={620}
        y={60}
        fontFamily="Arial, sans-serif"
        fontSize={48}
        fontWeight="bold"
        fill="#00c853"
        textAnchor="middle"
      >
        {"98%"}
      </text>
      <text
        x={620}
        y={100}
        fontFamily="Arial, sans-serif"
        fontSize={16}
        fill="#616161"
        textAnchor="middle"
      >
        {"Precis\xE3o na"}
      </text>
      <text
        x={620}
        y={125}
        fontFamily="Arial, sans-serif"
        fontSize={16}
        fill="#616161"
        textAnchor="middle"
      >
        {"precifica\xE7\xE3o"}
      </text>
      <rect
        x={820}
        y={0}
        width={320}
        height={180}
        rx={12}
        fill="#ffffff"
        filter="url(#shadow)"
      />
      <text
        x={980}
        y={60}
        fontFamily="Arial, sans-serif"
        fontSize={48}
        fontWeight="bold"
        fill="#00c853"
        textAnchor="middle"
      >
        {"-40%"}
      </text>
      <text
        x={980}
        y={100}
        fontFamily="Arial, sans-serif"
        fontSize={16}
        fill="#616161"
        textAnchor="middle"
      >
        {"Redu\xE7\xE3o no"}
      </text>
      <text
        x={980}
        y={125}
        fontFamily="Arial, sans-serif"
        fontSize={16}
        fill="#616161"
        textAnchor="middle"
      >
        {"tempo operacional"}
      </text>
    </g>
    <g id="features" transform="translate(0, 880)">
      <text
        x={720}
        y={60}
        fontFamily="Arial, sans-serif"
        fontSize={42}
        fontWeight="bold"
        fill="#1b5e20"
        textAnchor="middle"
      >
        {"Funcionalidades Completas"}
      </text>
      <rect
        x={100}
        y={140}
        width={380}
        height={280}
        rx={12}
        fill="#ffffff"
        filter="url(#shadow)"
      />
      <circle cx={180} cy={200} r={35} fill="url(#greenGradient)" />
      <text
        x={180}
        y={210}
        fontFamily="Arial, sans-serif"
        fontSize={28}
        fill="#ffffff"
        textAnchor="middle"
      >
        {"\u20BF"}
      </text>
      <text
        x={290}
        y={200}
        fontFamily="Arial, sans-serif"
        fontSize={22}
        fontWeight="bold"
        fill="#1b5e20"
      >
        {"Precifica\xE7\xE3o"}
      </text>
      <text
        x={290}
        y={228}
        fontFamily="Arial, sans-serif"
        fontSize={22}
        fontWeight="bold"
        fill="#1b5e20"
      >
        {"Inteligente"}
      </text>
      <text
        x={130}
        y={280}
        fontFamily="Arial, sans-serif"
        fontSize={15}
        fill="#616161"
      >
        <tspan x={130} dy={0}>
          {"\u2022 Algoritmos de precifica\xE7\xE3o"}
        </tspan>
        <tspan x={130} dy={25}>
          {"\u2022 An\xE1lise de margem em tempo real"}
        </tspan>
        <tspan x={130} dy={25}>
          {"\u2022 Sugest\xF5es autom\xE1ticas"}
        </tspan>
        <tspan x={130} dy={25}>
          {"\u2022 Relat\xF3rios de performance"}
        </tspan>
      </text>
      <rect
        x={530}
        y={140}
        width={380}
        height={280}
        rx={12}
        fill="#ffffff"
        filter="url(#shadow)"
      />
      <circle cx={610} cy={200} r={35} fill="url(#greenGradient)" />
      <text
        x={610}
        y={213}
        fontFamily="Arial, sans-serif"
        fontSize={32}
        fill="#ffffff"
        textAnchor="middle"
      >
        {"\uD83D\uDCE6"}
      </text>
      <text
        x={720}
        y={200}
        fontFamily="Arial, sans-serif"
        fontSize={22}
        fontWeight="bold"
        fill="#1b5e20"
      >
        {"Gest\xE3o de"}
      </text>
      <text
        x={720}
        y={228}
        fontFamily="Arial, sans-serif"
        fontSize={22}
        fontWeight="bold"
        fill="#1b5e20"
      >
        {"Remessas"}
      </text>
      <text
        x={560}
        y={280}
        fontFamily="Arial, sans-serif"
        fontSize={15}
        fill="#616161"
      >
        <tspan x={560} dy={0}>
          {"\u2022 Controle total de envios"}
        </tspan>
        <tspan x={560} dy={25}>
          {"\u2022 Rastreamento de produtos"}
        </tspan>
        <tspan x={560} dy={25}>
          {"\u2022 Gest\xE3o de outlets"}
        </tspan>
        <tspan x={560} dy={25}>
          {"\u2022 Hist\xF3rico completo"}
        </tspan>
      </text>
      <rect
        x={960}
        y={140}
        width={380}
        height={280}
        rx={12}
        fill="#ffffff"
        filter="url(#shadow)"
      />
      <circle cx={1040} cy={200} r={35} fill="url(#greenGradient)" />
      <text
        x={1040}
        y={213}
        fontFamily="Arial, sans-serif"
        fontSize={32}
        fill="#ffffff"
        textAnchor="middle"
      >
        {"\uD83D\uDCCA"}
      </text>
      <text
        x={1150}
        y={228}
        fontFamily="Arial, sans-serif"
        fontSize={22}
        fontWeight="bold"
        fill="#1b5e20"
      >
        {"Relat\xF3rios"}
      </text>
      <text
        x={990}
        y={280}
        fontFamily="Arial, sans-serif"
        fontSize={15}
        fill="#616161"
      >
        <tspan x={990} dy={0}>
          {"\u2022 Visualiza\xE7\xF5es em tempo real"}
        </tspan>
        <tspan x={990} dy={25}>
          {"\u2022 KPIs personalizados"}
        </tspan>
        <tspan x={990} dy={25}>
          {"\u2022 Exporta\xE7\xE3o de dados"}
        </tspan>
        <tspan x={990} dy={25}>
          {"\u2022 An\xE1lises preditivas"}
        </tspan>
      </text>
    </g>
    <g id="process" transform="translate(0, 1580)">
      <text
        x={720}
        y={60}
        fontFamily="Arial, sans-serif"
        fontSize={42}
        fontWeight="bold"
        fill="#1b5e20"
        textAnchor="middle"
      >
        {"Como Funciona"}
      </text>
      <circle
        cx={280}
        cy={200}
        r={60}
        fill="url(#greenGradient)"
        filter="url(#shadow)"
      />
      <text
        x={280}
        y={215}
        fontFamily="Arial, sans-serif"
        fontSize={36}
        fontWeight="bold"
        fill="#ffffff"
        textAnchor="middle"
      >
        {"1"}
      </text>
      <text
        x={280}
        y={300}
        fontFamily="Arial, sans-serif"
        fontSize={18}
        fontWeight="bold"
        fill="#1b5e20"
        textAnchor="middle"
      >
        {"Cadastro de"}
      </text>
      <text
        x={280}
        y={328}
        fontFamily="Arial, sans-serif"
        fontSize={18}
        fontWeight="bold"
        fill="#1b5e20"
        textAnchor="middle"
      >
        {"Produtos"}
      </text>
      <line
        x1={340}
        y1={200}
        x2={480}
        y2={200}
        stroke="#00c853"
        strokeWidth={3}
        strokeDasharray="8,8"
      />
      <circle
        cx={580}
        cy={200}
        r={60}
        fill="url(#greenGradient)"
        filter="url(#shadow)"
      />
      <text
        x={580}
        y={215}
        fontFamily="Arial, sans-serif"
        fontSize={36}
        fontWeight="bold"
        fill="#ffffff"
        textAnchor="middle"
      >
        {"2"}
      </text>
      <text
        x={580}
        y={300}
        fontFamily="Arial, sans-serif"
        fontSize={18}
        fontWeight="bold"
        fill="#1b5e20"
        textAnchor="middle"
      >
        {"Precifica\xE7\xE3o"}
      </text>
      <text
        x={580}
        y={328}
        fontFamily="Arial, sans-serif"
        fontSize={18}
        fontWeight="bold"
        fill="#1b5e20"
        textAnchor="middle"
      >
        {"Autom\xE1tica"}
      </text>
      <line
        x1={640}
        y1={200}
        x2={780}
        y2={200}
        stroke="#00c853"
        strokeWidth={3}
        strokeDasharray="8,8"
      />
      <circle
        cx={880}
        cy={200}
        r={60}
        fill="url(#greenGradient)"
        filter="url(#shadow)"
      />
      <text
        x={880}
        y={215}
        fontFamily="Arial, sans-serif"
        fontSize={36}
        fontWeight="bold"
        fill="#ffffff"
        textAnchor="middle"
      >
        {"3"}
      </text>
      <text
        x={880}
        y={300}
        fontFamily="Arial, sans-serif"
        fontSize={18}
        fontWeight="bold"
        fill="#1b5e20"
        textAnchor="middle"
      >
        {"Gest\xE3o de"}
      </text>
      <text
        x={880}
        y={328}
        fontFamily="Arial, sans-serif"
        fontSize={18}
        fontWeight="bold"
        fill="#1b5e20"
        textAnchor="middle"
      >
        {"Remessas"}
      </text>
      <line
        x1={940}
        y1={200}
        x2={1080}
        y2={200}
        stroke="#00c853"
        strokeWidth={3}
        strokeDasharray="8,8"
      />
      <circle
        cx={1180}
        cy={200}
        r={60}
        fill="url(#greenGradient)"
        filter="url(#shadow)"
      />
      <text
        x={1180}
        y={215}
        fontFamily="Arial, sans-serif"
        fontSize={36}
        fontWeight="bold"
        fill="#ffffff"
        textAnchor="middle"
      >
        {"4"}
      </text>
      <text
        x={1180}
        y={328}
        fontFamily="Arial, sans-serif"
        fontSize={18}
        fontWeight="bold"
        fill="#1b5e20"
        textAnchor="middle"
      >
        {"Insights"}
      </text>
    </g>
    <g id="benefits" transform="translate(0, 2050)">
      <rect width={1440} height={500} fill="url(#darkGradient)" />
      <text
        x={720}
        y={80}
        fontFamily="Arial, sans-serif"
        fontSize={42}
        fontWeight="bold"
        fill="#ffffff"
        textAnchor="middle"
      >
        {"Por que escolher a Gira\xEA?"}
      </text>
      <g transform="translate(150, 150)">
        <circle cx={30} cy={0} r={12} fill="#00e676" />
        <text
          x={60}
          y={8}
          fontFamily="Arial, sans-serif"
          fontSize={18}
          fill="#ffffff"
        >
          {
            "Economia Circular na pr\xE1tica: reduza desperd\xEDcio e maximize valor"
          }
        </text>
      </g>
      <g transform="translate(150, 220)">
        <circle cx={30} cy={0} r={12} fill="#00e676" />
        <text
          x={60}
          y={8}
          fontFamily="Arial, sans-serif"
          fontSize={18}
          fill="#ffffff"
        >
          {"Precifica\xE7\xE3o inteligente: algoritmos que otimizam sua margem"}
        </text>
      </g>
      <g transform="translate(150, 290)">
        <circle cx={30} cy={0} r={12} fill="#00e676" />
        <text
          x={60}
          y={8}
          fontFamily="Arial, sans-serif"
          fontSize={18}
          fill="#ffffff"
        >
          {"Controle total: gerencie toda opera\xE7\xE3o em um \xFAnico lugar"}
        </text>
      </g>
      <g transform="translate(150, 360)">
        <circle cx={30} cy={0} r={12} fill="#00e676" />
        <text
          x={60}
          y={8}
          fontFamily="Arial, sans-serif"
          fontSize={18}
          fill="#ffffff"
        >
          {
            "Decis\xF5es baseadas em dados: relat\xF3rios e dashboards em tempo real"
          }
        </text>
      </g>
    </g>
    <g id="cta" transform="translate(0, 2600)">
      <rect
        x={320}
        y={40}
        width={800}
        height={380}
        rx={16}
        fill="#ffffff"
        filter="url(#shadow)"
      />
      <text
        x={720}
        y={120}
        fontFamily="Arial, sans-serif"
        fontSize={38}
        fontWeight="bold"
        fill="#1b5e20"
        textAnchor="middle"
      >
        {"Pronto para transformar"}
      </text>
      <text
        x={720}
        y={165}
        fontFamily="Arial, sans-serif"
        fontSize={38}
        fontWeight="bold"
        fill="#1b5e20"
        textAnchor="middle"
      >
        {"sua opera\xE7\xE3o?"}
      </text>
      <text
        x={720}
        y={220}
        fontFamily="Arial, sans-serif"
        fontSize={18}
        fill="#616161"
        textAnchor="middle"
      >
        {"Solicite um or\xE7amento e descubra como podemos"}
      </text>
      <text
        x={720}
        y={248}
        fontFamily="Arial, sans-serif"
        fontSize={18}
        fill="#616161"
        textAnchor="middle"
      >
        {"otimizar sua gest\xE3o de economia circular"}
      </text>
      <rect
        x={460}
        y={290}
        width={520}
        height={70}
        rx={35}
        fill="url(#greenGradient)"
        filter="url(#shadow)"
      />
      <text
        x={720}
        y={334}
        fontFamily="Arial, sans-serif"
        fontSize={22}
        fontWeight="bold"
        fill="#ffffff"
        textAnchor="middle"
      >
        {"Solicitar Or\xE7amento Agora"}
      </text>
    </g>
    <g id="footer" transform="translate(0, 3040)">
      <rect width={1440} height={160} fill="#1b5e20" />
      <text
        x={720}
        y={50}
        fontFamily="Arial, sans-serif"
        fontSize={24}
        fontWeight="bold"
        fill="#ffffff"
        textAnchor="middle"
      >
        {"Gira\xEA"}
      </text>
      <text
        x={720}
        y={80}
        fontFamily="Arial, sans-serif"
        fontSize={14}
        fill="#a5d6a7"
        textAnchor="middle"
      >
        {"Solu\xE7\xF5es em Economia Circular"}
      </text>
      <text
        x={720}
        y={120}
        fontFamily="Arial, sans-serif"
        fontSize={14}
        fill="#a5d6a7"
        textAnchor="middle"
      >
        {"contato@girae.com.br | (11) 1234-5678"}
      </text>
    </g>
  </svg>
);
export default SVGComponent;
