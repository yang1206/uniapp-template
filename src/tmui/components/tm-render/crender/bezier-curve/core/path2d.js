/**
 * 点方法。
 * 此库来自konva
 * 移植：https://jx2d.cn
 * tmzdy
 */
export function parsePathData(data) {
	if (!data) {
		return [];
	}
	var cs = data;
	var cc = [
		'm',
		'M',
		'l',
		'L',
		'v',
		'V',
		'h',
		'H',
		'z',
		'Z',
		'c',
		'C',
		'q',
		'Q',
		't',
		'T',
		's',
		'S',
		'a',
		'A',
	];
	cs = cs.replace(new RegExp(' ', 'g'), ',');
	for (var n = 0; n < cc.length; n++) {
		cs = cs.replace(new RegExp(cc[n], 'g'), '|' + cc[n]);
	}
	var arr = cs.split('|');
	var ca = [];
	var coords = [];
	var cpx = 0;
	var cpy = 0;
	var re = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
	var match;
	for (n = 1; n < arr.length; n++) {
		var str = arr[n];
		var c = str.charAt(0);
		str = str.slice(1);
		coords.length = 0;
		while ((match = re.exec(str))) {
			coords.push(match[0]);
		}
		var p = [];
		for (var j = 0, jlen = coords.length; j < jlen; j++) {
			if (coords[j] === '00') {
				p.push(0, 0);
				continue;
			}
			var parsed = parseFloat(coords[j]);
			if (!isNaN(parsed)) {
				p.push(parsed);
			} else {
				p.push(0);
			}
		}
		while (p.length > 0) {
			if (isNaN(p[0])) {
				break;
			}
			var cmd = null;
			var points = [];
			var startX = cpx,
				startY = cpy;
			var prevCmd, ctlPtx, ctlPty;
			var rx, ry, psi, fa, fs, x1, y1;
			switch (c) {
				case 'l':
					cpx += p.shift();
					cpy += p.shift();
					cmd = 'L';
					points.push(cpx, cpy);
					break;
				case 'L':
					cpx = p.shift();
					cpy = p.shift();
					points.push(cpx, cpy);
					break;
				case 'm':
					var dx = p.shift();
					var dy = p.shift();
					cpx += dx;
					cpy += dy;
					cmd = 'M';
					if (ca.length > 2 && ca[ca.length - 1].command === 'z') {
						for (var idx = ca.length - 2; idx >= 0; idx--) {
							if (ca[idx].command === 'M') {
								cpx = ca[idx].points[0] + dx;
								cpy = ca[idx].points[1] + dy;
								break;
							}
						}
					}
					points.push(cpx, cpy);
					c = 'l';
					break;
				case 'M':
					cpx = p.shift();
					cpy = p.shift();
					cmd = 'M';
					points.push(cpx, cpy);
					c = 'L';
					break;
				case 'h':
					cpx += p.shift();
					cmd = 'L';
					points.push(cpx, cpy);
					break;
				case 'H':
					cpx = p.shift();
					cmd = 'L';
					points.push(cpx, cpy);
					break;
				case 'v':
					cpy += p.shift();
					cmd = 'L';
					points.push(cpx, cpy);
					break;
				case 'V':
					cpy = p.shift();
					cmd = 'L';
					points.push(cpx, cpy);
					break;
				case 'C':
					points.push(p.shift(), p.shift(), p.shift(), p.shift());
					cpx = p.shift();
					cpy = p.shift();
					points.push(cpx, cpy);
					break;
				case 'c':
					points.push(cpx + p.shift(), cpy + p.shift(), cpx + p.shift(), cpy + p.shift());
					cpx += p.shift();
					cpy += p.shift();
					cmd = 'C';
					points.push(cpx, cpy);
					break;
				case 'S':
					ctlPtx = cpx;
					ctlPty = cpy;
					prevCmd = ca[ca.length - 1];
					if (prevCmd.command === 'C') {
						ctlPtx = cpx + (cpx - prevCmd.points[2]);
						ctlPty = cpy + (cpy - prevCmd.points[3]);
					}
					points.push(ctlPtx, ctlPty, p.shift(), p.shift());
					cpx = p.shift();
					cpy = p.shift();
					cmd = 'C';
					points.push(cpx, cpy);
					break;
				case 's':
					ctlPtx = cpx;
					ctlPty = cpy;
					prevCmd = ca[ca.length - 1];
					if (prevCmd.command === 'C') {
						ctlPtx = cpx + (cpx - prevCmd.points[2]);
						ctlPty = cpy + (cpy - prevCmd.points[3]);
					}
					points.push(ctlPtx, ctlPty, cpx + p.shift(), cpy + p.shift());
					cpx += p.shift();
					cpy += p.shift();
					cmd = 'C';
					points.push(cpx, cpy);
					break;
				case 'Q':
					points.push(p.shift(), p.shift());
					cpx = p.shift();
					cpy = p.shift();
					points.push(cpx, cpy);
					break;
				case 'q':
					points.push(cpx + p.shift(), cpy + p.shift());
					cpx += p.shift();
					cpy += p.shift();
					cmd = 'Q';
					points.push(cpx, cpy);
					break;
				case 'T':
					ctlPtx = cpx;
					ctlPty = cpy;
					prevCmd = ca[ca.length - 1];
					if (prevCmd.command === 'Q') {
						ctlPtx = cpx + (cpx - prevCmd.points[0]);
						ctlPty = cpy + (cpy - prevCmd.points[1]);
					}
					cpx = p.shift();
					cpy = p.shift();
					cmd = 'Q';
					points.push(ctlPtx, ctlPty, cpx, cpy);
					break;
				case 't':
					ctlPtx = cpx;
					ctlPty = cpy;
					prevCmd = ca[ca.length - 1];
					if (prevCmd.command === 'Q') {
						ctlPtx = cpx + (cpx - prevCmd.points[0]);
						ctlPty = cpy + (cpy - prevCmd.points[1]);
					}
					cpx += p.shift();
					cpy += p.shift();
					cmd = 'Q';
					points.push(ctlPtx, ctlPty, cpx, cpy);
					break;
				case 'A':
					rx = p.shift();
					ry = p.shift();
					psi = p.shift();
					fa = p.shift();
					fs = p.shift();
					x1 = cpx;
					y1 = cpy;
					cpx = p.shift();
					cpy = p.shift();
					cmd = 'A';
					points = convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
					break;
				case 'a':
					rx = p.shift();
					ry = p.shift();
					psi = p.shift();
					fa = p.shift();
					fs = p.shift();
					x1 = cpx;
					y1 = cpy;
					cpx += p.shift();
					cpy += p.shift();
					cmd = 'A';
					points = convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
					break;
			}
			ca.push({
				command: cmd || c,
				points: points,
				start: {
					x: startX,
					y: startY,
				},
				pathLength: calcLength(startX, startY, cmd || c, points),
			});
		}
		if (c === 'z' || c === 'Z') {
			ca.push({
				command: 'z',
				points: [],
				start: undefined,
				pathLength: 0,
			});
		}
	}
	return ca;
}
export function  getPointOnQuadraticBezier (pct, P1x, P1y, P2x, P2y, P3x, P3y) {
        function QB1(t) {
            return t * t;
        }
        function QB2(t) {
            return 2 * t * (1 - t);
        }
        function QB3(t) {
            return (1 - t) * (1 - t);
        }
        var x = P3x * QB1(pct) + P2x * QB2(pct) + P1x * QB3(pct);
        var y = P3y * QB1(pct) + P2y * QB2(pct) + P1y * QB3(pct);

        return {
            x: x,
            y: y
        };
    };
export function calcLength(x, y, cmd, points) {
	var len, p1, p2, t;
	
	switch (cmd) {
		case 'L':
			return getLineLength(x, y, points[0], points[1]);
		case 'C':
			len = 0.0;
			p1 = getPointOnCubicBezier(0, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
			for (t = 0.01; t <= 1; t += 0.01) {
				p2 = getPointOnCubicBezier(t, x, y, points[0], points[1], points[2], points[3], points[4], points[
					5]);
				len += getLineLength(p1.x, p1.y, p2.x, p2.y);
				p1 = p2;
			}
			return len;
		case 'Q':
			len = 0.0;
			p1 = getPointOnQuadraticBezier(0, x, y, points[0], points[1], points[2], points[3]);
			for (t = 0.01; t <= 1; t += 0.01) {
				p2 = getPointOnQuadraticBezier(t, x, y, points[0], points[1], points[2], points[3]);
				len += getLineLength(p1.x, p1.y, p2.x, p2.y);
				p1 = p2;
			}
			return len;
		case 'A':
			len = 0.0;
			var start = points[4];
			var dTheta = points[5];
			var end = points[4] + dTheta;
			var inc = Math.PI / 180.0;
			if (Math.abs(start - end) < inc) {
				inc = Math.abs(start - end);
			}
			p1 = getPointOnEllipticalArc(points[0], points[1], points[2], points[3], start, 0);
			if (dTheta < 0) {
				for (t = start - inc; t > end; t -= inc) {
					p2 = getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
					len += getLineLength(p1.x, p1.y, p2.x, p2.y);
					p1 = p2;
				}
			} else {
				for (t = start + inc; t < end; t += inc) {
					p2 = getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
					len += getLineLength(p1.x, p1.y, p2.x, p2.y);
					p1 = p2;
				}
			}
			p2 = getPointOnEllipticalArc(points[0], points[1], points[2], points[3], end, 0);
			len += getLineLength(p1.x, p1.y, p2.x, p2.y);
			return len;
	}
	return 0;
}

export function convertEndpointToCenterParameterization(x1, y1, x2, y2, fa, fs, rx, ry, psiDeg) {
	var psi = psiDeg * (Math.PI / 180.0);
	var xp = (Math.cos(psi) * (x1 - x2)) / 2.0 + (Math.sin(psi) * (y1 - y2)) / 2.0;
	var yp = (-1 * Math.sin(psi) * (x1 - x2)) / 2.0 +
		(Math.cos(psi) * (y1 - y2)) / 2.0;
	var lambda = (xp * xp) / (rx * rx) + (yp * yp) / (ry * ry);
	if (lambda > 1) {
		rx *= Math.sqrt(lambda);
		ry *= Math.sqrt(lambda);
	}
	var f = Math.sqrt((rx * rx * (ry * ry) - rx * rx * (yp * yp) - ry * ry * (xp * xp)) /
		(rx * rx * (yp * yp) + ry * ry * (xp * xp)));
	if (fa === fs) {
		f *= -1;
	}
	if (isNaN(f)) {
		f = 0;
	}
	var cxp = (f * rx * yp) / ry;
	var cyp = (f * -ry * xp) / rx;
	var cx = (x1 + x2) / 2.0 + Math.cos(psi) * cxp - Math.sin(psi) * cyp;
	var cy = (y1 + y2) / 2.0 + Math.sin(psi) * cxp + Math.cos(psi) * cyp;
	var vMag = function(v) {
		return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
	};
	var vRatio = function(u, v) {
		return (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v));
	};
	var vAngle = function(u, v) {
		return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vRatio(u, v));
	};
	var theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
	var u = [(xp - cxp) / rx, (yp - cyp) / ry];
	var v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
	var dTheta = vAngle(u, v);
	if (vRatio(u, v) <= -1) {
		dTheta = Math.PI;
	}
	if (vRatio(u, v) >= 1) {
		dTheta = 0;
	}
	if (fs === 0 && dTheta > 0) {
		dTheta = dTheta - 2 * Math.PI;
	}
	if (fs === 1 && dTheta < 0) {
		dTheta = dTheta + 2 * Math.PI;
	}
	return [cx, cy, rx, ry, theta, dTheta, psi, fs];
}

export function getSelfRect() {
	var points = [];
	this.dataArray.forEach(function(data) {
		if (data.command === 'A') {
			var start = data.points[4];
			var dTheta = data.points[5];
			var end = data.points[4] + dTheta;
			var inc = Math.PI / 180.0;
			if (Math.abs(start - end) < inc) {
				inc = Math.abs(start - end);
			}
			if (dTheta < 0) {
				for (let t = start - inc; t > end; t -= inc) {
					const point = Path.getPointOnEllipticalArc(data.points[0], data.points[1], data.points[2],
						data.points[3], t, 0);
					points.push(point.x, point.y);
				}
			} else {
				for (let t = start + inc; t < end; t += inc) {
					const point = Path.getPointOnEllipticalArc(data.points[0], data.points[1], data.points[2],
						data.points[3], t, 0);
					points.push(point.x, point.y);
				}
			}
		} else if (data.command === 'C') {
			for (let t = 0.0; t <= 1; t += 0.01) {
				const point = Path.getPointOnCubicBezier(t, data.start.x, data.start.y, data.points[0], data
					.points[1], data.points[2], data.points[3], data.points[4], data.points[5]);
				points.push(point.x, point.y);
			}
		} else {
			points = points.concat(data.points);
		}
	});
	var minX = points[0];
	var maxX = points[0];
	var minY = points[1];
	var maxY = points[1];
	var x, y;
	for (var i = 0; i < points.length / 2; i++) {
		x = points[i * 2];
		y = points[i * 2 + 1];
		if (!isNaN(x)) {
			minX = Math.min(minX, x);
			maxX = Math.max(maxX, x);
		}
		if (!isNaN(y)) {
			minY = Math.min(minY, y);
			maxY = Math.max(maxY, y);
		}
	}
	return {
		x: Math.round(minX),
		y: Math.round(minY),
		width: Math.round(maxX - minX),
		height: Math.round(maxY - minY),
	};
}

export function expandPoints(p, tension) {
    var len = p.length, allPoints = [], n, cp;
    for (n = 2; n < len - 2; n += 2) {
        cp = getControlPoints(p[n - 2], p[n - 1], p[n], p[n + 1], p[n + 2], p[n + 3], tension);
        if (isNaN(cp[0])) {
            continue;
        }
        allPoints.push(cp[0]);
        allPoints.push(cp[1]);
        allPoints.push(p[n]);
        allPoints.push(p[n + 1]);
        allPoints.push(cp[2]);
        allPoints.push(cp[3]);
    }
    return allPoints;
}

export function getControlPoints(x0, y0, x1, y1, x2, y2, t) {
    var d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)), d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), fa = (t * d01) / (d01 + d12), fb = (t * d12) / (d01 + d12), p1x = x1 - fa * (x2 - x0), p1y = y1 - fa * (y2 - y0), p2x = x1 + fb * (x2 - x0), p2y = y1 + fb * (y2 - y0);
    return [p1x, p1y, p2x, p2y];
}


export function getTensionPointsClosed(points,tension) {
        var p = points ,len = p.length, firstControlPoints = getControlPoints(p[len - 2], p[len - 1], p[0], p[1], p[2], p[3], tension), lastControlPoints = getControlPoints(p[len - 4], p[len - 3], p[len - 2], p[len - 1], p[0], p[1], tension), middle = expandPoints(p, tension), tp = [firstControlPoints[2], firstControlPoints[3]]
            .concat(middle)
            .concat([
            lastControlPoints[0],
            lastControlPoints[1],
            p[len - 2],
            p[len - 1],
            lastControlPoints[2],
            lastControlPoints[3],
            firstControlPoints[0],
            firstControlPoints[1],
            p[0],
            p[1],
        ]);
        return tp;
    }