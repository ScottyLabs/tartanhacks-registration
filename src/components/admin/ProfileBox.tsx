import {
  Box,
  CircularProgress,
  Collapse,
  Link,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from "@material-ui/core"
import { Cancel, Check, OpenInNew } from "@material-ui/icons"
import { ApplicationStatus } from "enums/ApplicationStatus"
import { Ethnicity, Gender } from "enums/Profile"
import React, { ReactElement, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import getApplicationStatus from "src/util/getApplicationStatus"
import { Participant } from "types/Participant"
import { RootState } from "types/RootState"

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    backgroundImage: `linear-gradient(316.54deg, rgba(255, 227, 227, 0.7565) 
    35.13%, rgba(255, 255, 255, 0.85) 126.39%)`,
    boxShadow: "0px 4px 4px rgba(200, 116, 56, 0.25)",
    backdropFilter: "blur(4px)",
    padding: "2em",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    maxHeight: "80%",
    overflow: "auto"
  },
  statusLabel: {
    fontWeight: "bold"
  },
  sponsorList: {
    display: "flex",
    flexDirection: "column"
  }
}))

const ProfileContent = ({ profile }: { profile?: any }): ReactElement => {
  const classes = useStyles()

  const sponsors = useSelector((store: RootState) => store?.sponsors?.data)
  const sponsorMap: Record<string, string> = {}
  for (const { _id, name } of sponsors) {
    sponsorMap[_id] = name
  }

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Typography variant="h6">Basic Information</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Display Name</TableCell>
          <TableCell>{profile.displayName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Full Name</TableCell>
          <TableCell>
            {profile.firstName} {profile.lastName}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Gender</TableCell>
          <TableCell>
            {profile.gender === Gender.OTHER
              ? profile.genderOther
              : profile.gender}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Ethnicity</TableCell>
          <TableCell>
            {profile.ethnicity === Ethnicity.OTHER
              ? profile.ethnicityOther
              : profile.ethnicity}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="h6">Essays</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Essay 1</TableCell>
          <TableCell>{profile.essays[0]}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="h6">School Info</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>School</TableCell>
          <TableCell>{profile.school}</TableCell>
        </TableRow>
        {profile.college === null ? null : (
          <TableRow>
            <TableCell>College</TableCell>
            <TableCell>{profile.college}</TableCell>
          </TableRow>
        )}
        <TableRow>
          <TableCell>Level</TableCell>
          <TableCell>{profile.level}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Graduation Year</TableCell>
          <TableCell>{profile.graduationYear}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Major</TableCell>
          <TableCell>{profile.major}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="h6">Experience</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Coursework</TableCell>
          <TableCell>{profile.coursework}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Languages</TableCell>
          <TableCell>{profile.languages}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Number of hackathons attended</TableCell>
          <TableCell>{profile.hackathonExperience}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="h6">Work Authorization</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Work Permission</TableCell>
          <TableCell>{profile.workPermission}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Work Location</TableCell>
          <TableCell>{profile.workLocation}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Work Strengths</TableCell>
          <TableCell>{profile.workStrengths}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sponsor Ranking</TableCell>
          <TableCell>
            <div className={classes.sponsorList}>
              {profile.sponsorRanking.map((sponsorId: string, idx: number) => {
                return <div key={idx}>{sponsorMap[sponsorId] ?? sponsorId}</div>
              })}
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="h6">Portfolio</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>GitHub</TableCell>
          <TableCell>{profile.github}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Resume</TableCell>
          <TableCell>
            <Link href={profile.resume} target="_blank">
              <OpenInNew />
            </Link>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Design</TableCell>
          <TableCell>{profile.design}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Website</TableCell>
          <TableCell>{profile.website}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="h6">Logistical Information</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Dietary Restrictions</TableCell>
          <TableCell>{profile.dietaryRestrictions}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Shirt Size</TableCell>
          <TableCell>{profile.shirtSize}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Wants Hardware</TableCell>
          <TableCell>
            {profile.wantsHardware ? <Check /> : <Cancel />}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Attending Physically</TableCell>
          <TableCell>
            {profile.attendingPhysically ? <Check /> : <Cancel />}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Address</TableCell>
          <TableCell>{profile.address}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Region</TableCell>
          <TableCell>{profile.region}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Phone Number</TableCell>
          <TableCell>{profile.phoneNumber}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

const ProfileBox = React.forwardRef(
  (
    {
      participant
    }: {
      participant: Participant
    },
    ref
  ): ReactElement => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [profile, setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const applicationStatus = getApplicationStatus(participant?.status)

    const incomplete = [
      ApplicationStatus.UNVERIFIED,
      ApplicationStatus.VERIFIED
    ]
    let profileContent = null
    if (profile != null && !incomplete.includes(applicationStatus)) {
      profileContent = <ProfileContent profile={profile} />
    }

    useEffect(() => {
      const queryProfile = async () => {
        try {
          setLoading(true)
          const { data } = await dispatch(
            actions.user.getProfile(participant._id)
          )
          setProfile(data)
          setLoading(false)
        } catch (err) {
          console.error(err)
          setLoading(false)
        }
      }
      queryProfile()
    }, [participant])

    return (
      <Box className={classes.modal}>
        <Collapse in={loading}>
          <CircularProgress />
        </Collapse>
        {loading ? null : (
          <>
            <Typography variant="h5">{participant?.email}</Typography>
            <Typography variant="h6">
              Status:{" "}
              <span className={classes.statusLabel}>{applicationStatus}</span>
            </Typography>
            {profileContent}
          </>
        )}
      </Box>
    )
  }
)

export default ProfileBox
