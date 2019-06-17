// vendors
import React from "react"
import SectionWithPanel, { Panel } from "../components/SectionWithPanel"

import { colors } from "../styles/variables"

const MandatsView = () => {
  return (
    <SectionWithPanel title="Mandats" id="mandats">
      <Panel
        backgroundColor={colors.doublePearlLusta}
        starColor={colors.prussianBlue}
        color={colors.verdunGreen}
      >
        <p>
          Favoriser la recherche, création et production alliant danse et
          musique.
        </p>
      </Panel>

      <Panel
        backgroundColor={colors.verdunGreen}
        starColor={colors.prussianBlue}
        color={colors.doublePearlLusta}
      >
        <p>
          Stimuler les réflexions à l'égard des arts&nbsp;pluri-disciplinaires.
        </p>
      </Panel>

      <Panel
        backgroundColor={colors.prussianBlue}
        starColor={colors.scarlet}
        color={colors.doublePearlLusta}
      >
        <p>Encourager la rencontre entre plusieurs artistes.</p>
      </Panel>

      <Panel
        backgroundColor={colors.scarlet}
        starColor={colors.verdunGreen}
        color={colors.doublePearlLusta}
      >
        <p>
          Encourager le rayonnement d'artistes de Québec au niveau local,
          régional et international.
        </p>
      </Panel>

      <Panel
        backgroundColor={colors.black}
        starColor={colors.scarlet}
        color={colors.doublePearlLusta}
      >
        <p>Développer un large public</p>
      </Panel>
    </SectionWithPanel>
  )
}

export default MandatsView
