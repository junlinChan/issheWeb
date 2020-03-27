import request from '@/utils/request'

export function addServer(params) {
  return request({
    url: '/addserver/',
    method: 'post',
    data: params
  })
}

export function getServerList(params) {
  return request({
    url: '/servers/',
    method: 'get',
    params
  })
}

export function countServer() {
  return request({
    url: '/ServerCount/',
    method: 'get'
  })
}

export function deleteServer(id) {
  return request({
    url: '/servers/' + id + '/',
    method: 'delete'
  })
}

export function getIdcsList(params) {
  return request({
    url: '/idcs/',
    method: 'get',
    params
  })
}

export function updateServer(id, data) {
  return request({
    url: '/servers/' + id + '/',
    method: 'PATCH',
    data
  })
}

/*
 * 硬件
 */
export function getHardwareList(params) {
  return request({
    url: '/hardware/',
    method: 'get',
    params
  })
}

export function addHardware(data) {
  return request({
    url: '/hardware/',
    method: 'post',
    data
  })
}

export function updateHardware(id, data) {
  return request({
    url: '/hardware/' + id + '/',
    method: 'put',
    data
  })
}

export function deleteHardware(id) {
  return request({
    url: '/hardware/' + id + '/',
    method: 'delete'
  })
}

/*
 * idcs
 */
export function getIdcList(params) {
  return request({
    url: '/idcs/',
    method: 'get',
    params
  })
}

export function addIdc(data) {
  return request({
    url: '/idcs/',
    method: 'post',
    data
  })
}

export function updateIdc(id, data) {
  return request({
    url: '/idcs/' + id + '/',
    method: 'put',
    data
  })
}

export function deleteIdc(id) {
  return request({
    url: '/idcs/' + id + '/',
    method: 'delete'
  })
}

/*
 * 机柜
 */
export function getCabinetList(params) {
  return request({
    url: '/cabinet/',
    method: 'get',
    params
  })
}

export function addCabinet(data) {
  return request({
    url: '/cabinet/',
    method: 'post',
    data
  })
}

export function updateCabinet(id, data) {
  return request({
    url: '/cabinet/' + id + '/',
    method: 'put',
    data
  })
}

export function deleteCabinet(id) {
  return request({
    url: '/cabinet/' + id + '/',
    method: 'delete'
  })
}
