"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh, Group } from "three"
import { Text, Environment } from "@react-three/drei"

interface Scene3DProps {
  progress: number
}

export function Scene3D({ progress }: Scene3DProps) {
  const groupRef = useRef<Group>(null)
  const shieldRef = useRef<Mesh>(null)
  const circuitRef = useRef<Group>(null)
  const particleRingRef = useRef<Group>(null)

  // Circuit nodes positions
  const circuitNodes = useMemo(
    () => [
      { x: -0.8, y: 0.6, z: 0.1 },
      { x: 0.8, y: 0.6, z: 0.1 },
      { x: -0.6, y: -0.4, z: 0.1 },
      { x: 0.6, y: -0.4, z: 0.1 },
      { x: 0, y: 0.8, z: 0.1 },
      { x: 0, y: -0.8, z: 0.1 },
    ],
    [],
  )

  // Particle ring positions
  const particles = useMemo(() => {
    const count = 12
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2
      return {
        x: Math.cos(angle) * 2,
        y: Math.sin(angle) * 2,
        z: -0.5,
        delay: i * 0.1,
      }
    })
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Subtle idle rotation for the entire group
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1
      groupRef.current.rotation.x = Math.cos(time * 0.2) * 0.05
    }

    // Shield gentle floating
    if (shieldRef.current) {
      shieldRef.current.position.y = Math.sin(time * 0.8) * 0.1
    }

    // Circuit nodes pulsing based on progress
    if (circuitRef.current) {
      circuitRef.current.children.forEach((child, index) => {
        const mesh = child as Mesh
        const progressThreshold = (index / circuitNodes.length) * 100
        const isActive = progress > progressThreshold
        const pulseIntensity = isActive ? 1 + Math.sin(time * 3 + index) * 0.3 : 0.3

        if (mesh.material && "emissiveIntensity" in mesh.material) {
          ;(mesh.material as any).emissiveIntensity = pulseIntensity
        }
      })
    }

    // Particle ring rotation
    if (particleRingRef.current) {
      particleRingRef.current.rotation.z = time * 0.5
      particleRingRef.current.children.forEach((child, index) => {
        const mesh = child as Mesh
        const particle = particles[index]
        const opacity = Math.max(0, (progress - 20) / 80) // Fade in after 20% progress
        mesh.scale.setScalar(0.5 + Math.sin(time * 2 + particle.delay) * 0.2)

        if (mesh.material && "opacity" in mesh.material) {
          ;(mesh.material as any).opacity = opacity * (0.6 + Math.sin(time + particle.delay) * 0.4)
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Environment lighting */}
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 2, 5]} intensity={0.8} />

      {/* Shield base */}
      <mesh ref={shieldRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.2, 6]} />
        <meshStandardMaterial
          color="#1E3A8A"
          metalness={0.3}
          roughness={0.4}
          emissive="#1E3A8A"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Map pin silhouette in center */}
      <mesh position={[0, 0.2, 0.11]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial
          color="#10B981"
          emissive="#10B981"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, -0.1, 0.11]}>
        <coneGeometry args={[0.08, 0.3, 4]} />
        <meshStandardMaterial
          color="#10B981"
          emissive="#10B981"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Circuit nodes */}
      <group ref={circuitRef}>
        {circuitNodes.map((node, index) => (
          <mesh key={index} position={[node.x, node.y, node.z]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color="#10B981"
              emissive="#10B981"
              emissiveIntensity={0.3}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Circuit lines connecting nodes */}
      <group>
        {circuitNodes.slice(0, -1).map((node, index) => {
          const nextNode = circuitNodes[index + 1]
          const midX = (node.x + nextNode.x) / 2
          const midY = (node.y + nextNode.y) / 2
          const distance = Math.sqrt(Math.pow(nextNode.x - node.x, 2) + Math.pow(nextNode.y - node.y, 2))

          return (
            <mesh key={`line-${index}`} position={[midX, midY, 0.1]}>
              <boxGeometry args={[distance, 0.02, 0.01]} />
              <meshStandardMaterial
                color="#10B981"
                emissive="#10B981"
                emissiveIntensity={0.2}
                transparent
                opacity={0.6}
              />
            </mesh>
          )
        })}
      </group>

      {/* Particle ring */}
      <group ref={particleRingRef}>
        {particles.map((particle, index) => (
          <mesh key={index} position={[particle.x, particle.y, particle.z]}>
            <sphereGeometry args={[0.03, 6, 6]} />
            <meshStandardMaterial
              color="#F97316"
              emissive="#F97316"
              emissiveIntensity={0.4}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}
      </group>

      {/* Guardian text */}
      <Text
        position={[0, -2, 0]}
        fontSize={0.2}
        color="#1E3A8A"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        GUARDIAN
      </Text>
    </group>
  )
}
