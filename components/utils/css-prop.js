export default (prop, val) => {
	return prop && val ? `${prop} : ${val};` : ''
}
