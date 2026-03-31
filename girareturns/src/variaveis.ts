/**
 * Configuração da demo Live View — sem URLs de API reais.
 * Dados e chamadas são simulados em `@/mock/demoApi`.
 */

/** Link genérico para “falar com suporte” na demo (substitua no portfólio pelo seu contato). */
export const LINK_SUPORTE_DEMO =
  "mailto:contato@exemplo-demo.local?subject=Suporte%20%E2%80%94%20Demo%20GiraReturns";

export function formatarNumeroBrasileiro(input: string | number | null, toFixed?: number): string {
    let num: number;

    if (input === null) {
        return '';
    }

    if (typeof input === 'string') {
        const cleanedString = input.replace(/\./g, '').replace(/,/g, '.');
        num = parseFloat(cleanedString);
    } else {
        num = input;
    }

    if (isNaN(num)) {
        return ''; 
    }

    if (toFixed) {
        return num.toLocaleString('pt-BR', {
            minimumFractionDigits: toFixed,
            maximumFractionDigits: toFixed
        });
    } else {
        return num.toLocaleString('pt-BR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    }
}

export interface ILineAuditoria {
    id: number,
    created_at: string,
    product_ean: string,
    product_name: string,
    new_price_type: string,
    new_price_base: number,
    new_price: number,
    new_discount_percentage: number,
    new_cost_estimated: number,
    new_cost_percentage: number,
    product_new: boolean,
    user_id: string,
    user_name: string,
    base_price_marketplace: number,
    base_price_marketplace_top1: number,
    base_price_marketplace_target: number,
    base_price_retail_offline: number,
    base_price_retail_online: number,
    base_last_price_store: number,
    product_internal_id: string,
    register_erp: boolean,
    register_user_id: string,
    base_price_url: string,
    price_reason: number,
    product_image_content: string,
    product_image_type: string,
    data_channel: string,
    data_seller: string
}
