import { prompt } from "inquirer";
import { PackageDetails, ShipmentDetails } from "../models/types";

const DELIMITER = " ";

export class UserInputService {
  private baseDeliveryCost: number;
  private numberOfPackages: number;
  private packageDetails: PackageDetails[] = [];

  public async getShipmentDetails(): Promise<ShipmentDetails> {
    await this.getBaseCostAndTotalPackages();
    await this.getAllPackageDetails();

    return {
      baseDeliveryCost: this.baseDeliveryCost,
      packageDetails: this.packageDetails,
    };
  }

  private async getBaseCostAndTotalPackages() {
    const answers = await prompt({
      name: "baseDeliveryCost_numberOfPkgs",
      type: "input",
      message:
        "Please enter base delivery cost and number of packages seperated by space? (eg: 100 3)",
      validate: function (baseDeliveryCost_numberOfPkgs) {
        if (!/^\d+\s\d+$/.test(baseDeliveryCost_numberOfPkgs))
          return "Incorrect format";

        return true;
      },
    });

    const answersArray = answers.baseDeliveryCost_numberOfPkgs.split(
      DELIMITER
    ) as string[];

    this.baseDeliveryCost = Number(answersArray[0]);
    this.numberOfPackages = Number(answersArray[1]);

    console.log(this.baseDeliveryCost, this.numberOfPackages);
  }

  private async getAllPackageDetails() {
    for (let i = 0; i < this.numberOfPackages; i++) {
      await this.getIndividualPackageDetails(i + 1);
    }
  }

  private async getIndividualPackageDetails(index: number) {
    const answers = await prompt({
      name: "packageDetail",
      type: "input",
      message: `Please enter details for package${index}: id, weight(kg), distance(km) and offercode (eg: PKG1 5 5 OFR001). `,
      validate: function (packageDetail) {
        if (!/^[a-zA-Z0-9]+\s\d+\s\d+\s[a-zA-Z0-9]+$/.test(packageDetail))
          return "Incorrect format";

        return true;
      },
    });

    const packageDetailArray = answers.packageDetail.split(DELIMITER);
    this.packageDetails.push({
      id: packageDetailArray[0],
      weight: Number(packageDetailArray[1]),
      distance: Number(packageDetailArray[2]),
      offerCode: packageDetailArray[3],
    });

    console.log(JSON.stringify(this.packageDetails));
  }
}
