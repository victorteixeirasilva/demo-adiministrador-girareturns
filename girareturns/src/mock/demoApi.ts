/**
 * Camada de simulação da API — Demo Live View (sem back-end real).
 * Todos os dados são fictícios.
 */

import type { ILineAuditoria } from "@/variaveis";
import type { IUsuario } from "@/components/OperadoresPopUp";

const DEMO_TOKEN = "demo-live-view-token";

function delay(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface ILogoResponse {
  logoUrl: string;
}

export interface IDashboardMock {
  shipping: {
    shipping_price_total: number;
    shipping_qty_total: number;
    shipping_qty_total_ean: number;
  };
  shipping_store: Array<{
    cmp_name_to: string;
    total_qty: number;
    total_price: number;
  }>;
  log: {
    search_qty_total: number;
    search_avg_time: number;
  };
  pricing: {
    pricing_qty_total: number;
    pricing_average_price: number;
    pricing_average_discount: number;
    pricing_total_discount: number;
    pricing_qty_user: number;
    pricing_first_log: string;
    pricing_qty_no_discount: number;
    pricing_qty_negative_discount: number;
    pricing_qty_equal_default_discount: number;
    pricing_qty_above_default_discount: number;
    pricing_qty_below_default_discount: number;
  };
  pricing_channel: Array<{ data_channel: string; pricing_qty_total: number }>;
  productivity_per_hour: Array<{ hour: string; total: number }>;
  reason: Array<{ price_reason_name: string; price_reason_qty_total: number }>;
}

const MOCK_STORES = [
  { cmp_name_to: "Outlet Centro — Demo", total_qty: 1240, total_price: 48200.5 },
  { cmp_name_to: "Outlet Zona Sul — Demo", total_qty: 980, total_price: 36540.0 },
  { cmp_name_to: "Outlet Zona Norte — Demo", total_qty: 756, total_price: 28910.75 },
  { cmp_name_to: "E-commerce — Demo", total_qty: 2105, total_price: 71200.0 },
];

const MOCK_DASHBOARD: IDashboardMock = {
  shipping: {
    shipping_price_total: 184851.25,
    shipping_qty_total: 5081,
    shipping_qty_total_ean: 942,
  },
  shipping_store: MOCK_STORES,
  log: {
    search_qty_total: 2156,
    search_avg_time: 2.8,
  },
  pricing: {
    pricing_qty_total: 3842,
    pricing_average_price: 127.45,
    pricing_average_discount: 22.3,
    pricing_total_discount: 85620.0,
    pricing_qty_user: 8,
    pricing_first_log: "2025-03-01T08:12:00.000Z",
    pricing_qty_no_discount: 412,
    pricing_qty_negative_discount: 89,
    pricing_qty_equal_default_discount: 1520,
    pricing_qty_above_default_discount: 980,
    pricing_qty_below_default_discount: 841,
  },
  pricing_channel: [
    { data_channel: "Marketplace A (demo)", pricing_qty_total: 1420 },
    { data_channel: "Busca interna", pricing_qty_total: 980 },
    { data_channel: "Concorrente — painel", pricing_qty_total: 756 },
    { data_channel: "Histórico loja", pricing_qty_total: 686 },
  ],
  productivity_per_hour: [
    { hour: "08h", total: 42 },
    { hour: "09h", total: 118 },
    { hour: "10h", total: 156 },
    { hour: "11h", total: 134 },
    { hour: "12h", total: 72 },
    { hour: "13h", total: 65 },
    { hour: "14h", total: 142 },
    { hour: "15h", total: 128 },
    { hour: "16h", total: 95 },
    { hour: "17h", total: 58 },
  ],
  reason: [
    { price_reason_name: "Alinhar à concorrência", price_reason_qty_total: 1120 },
    { price_reason_name: "Liquidação sazonal", price_reason_qty_total: 640 },
    { price_reason_name: "Ajuste de margem", price_reason_qty_total: 520 },
    { price_reason_name: "Política interna", price_reason_qty_total: 410 },
    { price_reason_name: "Outros (demo)", price_reason_qty_total: 180 },
  ],
};

const MOCK_OPERADORES: IUsuario[] = [
  {
    user_id: "u-demo-1",
    user_name: "Ana Silva (demo)",
    user_type: 1,
    user_status: "ativo",
    cmp_id: 1,
    user_key: "demo-key-1",
    user_group_id: "g1",
    user_code: 101,
  },
  {
    user_id: "u-demo-2",
    user_name: "Bruno Costa (demo)",
    user_type: 1,
    user_status: "ativo",
    cmp_id: 1,
    user_key: "demo-key-2",
    user_group_id: "g1",
    user_code: 102,
  },
  {
    user_id: "u-demo-3",
    user_name: "Carla Mendes (demo)",
    user_type: 1,
    user_status: "ativo",
    cmp_id: 1,
    user_key: "demo-key-3",
    user_group_id: "g1",
    user_code: 103,
  },
];

function baseAuditoriaLine(
  id: number,
  overrides: Partial<ILineAuditoria> & Pick<ILineAuditoria, "product_ean" | "product_name" | "user_id" | "user_name">
): ILineAuditoria {
  const base: ILineAuditoria = {
    id,
    created_at: "2025-03-15T14:32:00.000Z",
    product_ean: overrides.product_ean,
    product_name: overrides.product_name,
    new_price_type: "promocional",
    new_price_base: 99.9,
    new_price: 79.9,
    new_discount_percentage: 20,
    new_cost_estimated: 45.0,
    new_cost_percentage: 35,
    product_new: false,
    user_id: overrides.user_id,
    user_name: overrides.user_name,
    base_price_marketplace: 82.0,
    base_price_marketplace_top1: 79.5,
    base_price_marketplace_target: 78.0,
    base_price_retail_offline: 99.9,
    base_price_retail_online: 94.9,
    base_last_price_store: 99.9,
    product_internal_id: "",
    register_erp: true,
    register_user_id: "sys-demo",
    base_price_url: "https://example.com/produto-demo",
    price_reason: 1,
    product_image_content: "",
    product_image_type: "none",
    data_channel: "Busca interna",
    data_seller: "Loja demo",
  };
  return { ...base, ...overrides, id };
}

const MOCK_AUDITORIA_LINHAS: ILineAuditoria[] = [
  baseAuditoriaLine(1, {
    product_ean: "7891000123456",
    product_name: "Fone Bluetooth — modelo demo X1",
    user_id: "u-demo-1",
    user_name: "Ana Silva (demo)",
    new_price: 89.9,
    created_at: "2025-03-14T10:15:00.000Z",
  }),
  baseAuditoriaLine(2, {
    product_ean: "7891000123456",
    product_name: "Fone Bluetooth — modelo demo X1",
    user_id: "u-demo-2",
    user_name: "Bruno Costa (demo)",
    new_price: 84.5,
    created_at: "2025-03-13T16:40:00.000Z",
  }),
  baseAuditoriaLine(3, {
    product_ean: "7892000987654",
    product_name: "Carregador USB-C 25W (fictício)",
    user_id: "u-demo-1",
    user_name: "Ana Silva (demo)",
    new_price: 45.0,
    created_at: "2025-03-15T09:00:00.000Z",
  }),
  baseAuditoriaLine(4, {
    product_ean: "7893000555123",
    product_name: "Capa protetora smartphone — demo",
    user_id: "u-demo-3",
    user_name: "Carla Mendes (demo)",
    new_price: 32.9,
    created_at: "2025-03-12T11:22:00.000Z",
  }),
  baseAuditoriaLine(5, {
    product_ean: "7894000777888",
    product_name: "Mouse sem fio ergonômico (dados fictícios)",
    user_id: "u-demo-2",
    user_name: "Bruno Costa (demo)",
    new_price: 119.0,
    created_at: "2025-03-11T08:55:00.000Z",
  }),
];

const MOCK_PRODUTIVIDADE_OPERADORES = [
  { name: "Ana Silva (demo)", qtde_precificados: 428, username: "ana", valor_precificados: 0, rank_number: 1, color: "#0C9144" },
  { name: "Bruno Costa (demo)", qtde_precificados: 392, username: "bruno", valor_precificados: 0, rank_number: 2, color: "#0C9144" },
  { name: "Carla Mendes (demo)", qtde_precificados: 355, username: "carla", valor_precificados: 0, rank_number: 3, color: "#0C9144" },
  { name: "Diego Alves (demo)", qtde_precificados: 298, username: "diego", valor_precificados: 0, rank_number: 4, color: "#0C9144" },
  { name: "Elena Rocha (demo)", qtde_precificados: 241, username: "elena", valor_precificados: 0, rank_number: 5, color: "#0C9144" },
];

/** Resposta simulada do endpoint de logo (usa asset local na UI quando vazio). */
export async function demoGetLogo(_pathOrEmail: string): Promise<ILogoResponse> {
  await delay(200);
  return { logoUrl: "" };
}

/** Login demo: qualquer e-mail e senha não vazios aceitos; use senha "erro" para simular falha. */
export async function demoPostLogin(body: {
  email: string;
  password: string;
  pathProject: string;
}): Promise<{ ok: true; bearerToken: string } | { ok: false; status: 401 }> {
  await delay(500);
  if (!body.email?.trim() || !body.password?.trim()) {
    return { ok: false, status: 401 };
  }
  if (body.password === "erro") {
    return { ok: false, status: 401 };
  }
  return { ok: true, bearerToken: DEMO_TOKEN };
}

export async function demoGetPermissao(): Promise<boolean> {
  await delay(200);
  return true;
}

export async function demoGetDashboard(
  _dataInicio: string,
  _dataFim: string
): Promise<IDashboardMock> {
  await delay(450);
  return structuredClone(MOCK_DASHBOARD);
}

export async function demoGetDashboardProdutividade(
  _dataInicio: string,
  _dataFim: string
): Promise<typeof MOCK_PRODUTIVIDADE_OPERADORES> {
  await delay(350);
  return structuredClone(MOCK_PRODUTIVIDADE_OPERADORES);
}

export async function demoGetUsuariosAtivos(): Promise<IUsuario[]> {
  await delay(300);
  return structuredClone(MOCK_OPERADORES);
}

export async function demoGetAuditoria(
  _dataInicio: string,
  _dataFim: string
): Promise<ILineAuditoria[]> {
  await delay(400);
  return structuredClone(MOCK_AUDITORIA_LINHAS);
}

export async function demoGetAuditoriaUsuario(
  _dataInicio: string,
  _dataFim: string,
  idUsuario: string
): Promise<ILineAuditoria[]> {
  await delay(400);
  return MOCK_AUDITORIA_LINHAS.filter((l) => l.user_id === idUsuario).map((x) => ({ ...x }));
}

export async function demoGetAuditoriaEan(
  _dataInicio: string,
  _dataFim: string,
  ean: string
): Promise<ILineAuditoria[]> {
  await delay(400);
  const q = ean.trim();
  return MOCK_AUDITORIA_LINHAS.filter((l) => l.product_ean.includes(q)).map((x) => ({ ...x }));
}

export async function demoGetAuditoriaUsuarioEan(
  _dataInicio: string,
  _dataFim: string,
  idUsuario: string,
  ean: string
): Promise<ILineAuditoria[]> {
  await delay(400);
  const q = ean.trim();
  return MOCK_AUDITORIA_LINHAS.filter(
    (l) => l.user_id === idUsuario && l.product_ean.includes(q)
  ).map((x) => ({ ...x }));
}
