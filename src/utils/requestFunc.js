import request from '@/utils/request'
/**
 * 获取数据字典
 */
export function getDictionary() {
    return request({
        url: '/learun/adms/dataitem/map',
        method: 'get'
    })
}

/**
 * 获取数据源
 */
export function getSource(val) {
    return request({
        url: '/learun/adms/datasource/map',
        method: 'get',
        params: {
            data: val
        }
    })
}

/**
 * 数据保存
 * @param {object} data 保存数据
 * @param {string} url 接口地址
 * @param {string} keyValue 数据标志
 */
export function Page_Save(data, url, keyValue) {
    return request({
        url,
        method: 'post',
        data: {
            Data: JSON.stringify({
                entity: data,
                keyValue
            })
        }
    })
}