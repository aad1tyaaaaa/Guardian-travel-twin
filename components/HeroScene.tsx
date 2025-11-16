"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group, Mesh } from "three"
import { Text, Environment, Float, Sphere, Box } from "@react-three/drei"

export function HeroScene() {
  const groupRef = useRef<Group>(null)
  const shieldRef = useRef<Mesh>(null)
  const orbsRef = useRef<Group>(null)

  // Floating orbs representing different features
  const orbs = useMemo(
    () => [
      { position: [-3, 2, -1], color: "#1E3A8A", size: 0.3, speed: 0.8 }, // Digital ID
      { position: [3, 1, -2], color: "#F97316", size: 0.25, speed: 1.2 }, // SOS
      { position: [-2, -1, 1], color: "#10B981", size: 0.35, speed: 0.6 }, // Geo-fence
      { position: [2, -2, 0], color: "#8B5CF6", size: 0.28, speed: 1.0 }, // AI Monitor
    ],
    [],
  )

  // Data streams/connections
  const connections = useMemo(
    () => [
      { start: [-3, 2, -1], end: [0, 0, 0] },
      { start: [3, 1, -2], end: [0, 0, 0] },
      { start: [-2, -1, 1], end: [0, 0, 0] },
      { start: [2, -2, 0], end: [0, 0, 0] },
    ],
    [],
  )

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Main group gentle rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.1
      groupRef.current.rotation.x = Math.cos(time * 0.15) * 0.05
    }

    // Central shield floating
    if (shieldRef.current) {
      shieldRef.current.position.y = Math.sin(time * 0.5) * 0.2
      shieldRef.current.rotation.y = time * 0.1
    }

    // Animate floating orbs
    if (orbsRef.current) {
      orbsRef.current.children.forEach((child, index) => {
        const orb = orbs[index]
        const mesh = child as Mesh
        mesh.position.y = orb.position[1] + Math.sin(time * orb.speed + index) * 0.3
        mesh.rotation.x = time * orb.speed
        mesh.rotation.z = time * orb.speed * 0.5

        // Pulsing effect
        const scale = 1 + Math.sin(time * 2 + index) * 0.1
        mesh.scale.setScalar(scale)
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Environment */}
      <Environment preset="city" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#10B981" />

      {/* Central Guardian Shield */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={shieldRef} position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[1.5, 1.8, 0.3, 8]} />
          <meshStandardMaterial
            color="#1E3A8A"
            metalness={0.7}
            roughness={0.3}
            emissive="#1E3A8A"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Central core */}
        <mesh position={[0, 0, 0.2]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial
            color="#10B981"
            emissive="#10B981"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Guardian text */}
        <Text
          position={[0, -2.5, 0]}
          fontSize={0.4}
          color="#1E3A8A"
          anchorX="center"
          anchorY="middle"
          font="/fonts/montserrat-bold.woff"
        >
          GUARDIAN
        </Text>
      </Float>

      {/* Feature orbs */}
      <group ref={orbsRef}>
        {orbs.map((orb, index) => (
          <Float key={index} speed={orb.speed} rotationIntensity={0.3} floatIntensity={0.8}>
            <Sphere args={[orb.size, 16, 16]} position={orb.position as [number, number, number]}>
              <meshStandardMaterial
                color={orb.color}
                emissive={orb.color}
                emissiveIntensity={0.2}
                metalness={0.6}
                roughness={0.4}
                transparent
                opacity={0.9}
              />
            </Sphere>
          </Float>
        ))}
      </group>

      {/* Connection lines */}
      {connections.map((connection, index) => {
        const start = connection.start
        const end = connection.end
        const midX = (start[0] + end[0]) / 2
        const midY = (start[1] + end[1]) / 2
        const midZ = (start[2] + end[2]) / 2
        const distance = Math.sqrt(
          Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2) + Math.pow(end[2] - start[2], 2),
        )

        return (
          <Box key={index} args={[distance, 0.02, 0.02]} position={[midX, midY, midZ]}>
            <meshStandardMaterial
              color="#10B981"
              emissive="#10B981"
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
            />
          </Box>
        )
      })}

      {/* Particle field */}
      {Array.from({ length: 20 }, (_, i) => (
        <Float key={i} speed={0.5 + Math.random()} rotationIntensity={0.1} floatIntensity={0.3}>
          <Sphere
            args={[0.02, 8, 8]}
            position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6]}
          >
            <meshStandardMaterial
              color="#F97316"
              emissive="#F97316"
              emissiveIntensity={0.5}
              transparent
              opacity={0.7}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}
