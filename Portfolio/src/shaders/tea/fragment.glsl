#include <color_fragment>

vec2 displacedUv = vUv + cnoise(vec3(vUv * uPointsMod, uTime * 0.1));
float strength = cnoise(vec3(displacedUv * uWavesMod, uTime * 0.2));
strength = clamp(strength, 0.0, 1.0);
vec3 color = mix(uColorStart, uColorEnd, strength);

diffuseColor.rgb = vec3(color);